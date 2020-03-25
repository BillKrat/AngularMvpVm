import { Component, OnInit } from '@angular/core';
import { TreeNode, SelectItem } from 'primeng/api';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'files',
  styleUrls: ['./files.component.css'],
  templateUrl: './files.component.html'
})
export class FilesComponent implements OnInit {
  errorMessage: string;
  fileList: TreeNode[];
  selectedNodes: TreeNode[];
  foldersDropdown: SelectItem[] = [];
  selectedFolder: TreeNode;
  showCreateFolderPopup: boolean = false;
  NewFolderName: string = "";

  // Register the service
  constructor(private _FilesService: FilesService) { }

  ngOnInit(): void {
    this.getFilesAndFolders();
  }
  nodeSelect(event) {
    console.log(`${event.node.label} -- ${event.node.collapsedIcon}`);
    console.log(event.node);
    if (event.node.collapsedIcon.includes("folder")) {
      this.selectedFolder = event.node.label;
    }
  }

  public getFilesAndFolders() {
    this.errorMessage = "";

    //Clear Filelist
    this.fileList = [];

    // Call the service -- to get Files
    this._FilesService.getFiles()
      .subscribe((files) => {
        // Show the Files in the Tree Control
        this.fileList = files.children;
      },
        error => this.errorMessage = <any>error);

    // Clear the foldersDropdown
    this.foldersDropdown = [];

    // Call the service -- to get Folders
    this._FilesService.getFolders()
      .subscribe((folders) => {

        var tempFoldersDropdown: SelectItem[] = [];

        // Loop through the returned Nodes
        for (let folder of folders.children) {
          // Create a new SelectedItem
          let newSelectedItem: SelectItem = {
            label: folder.label,
            value: folder.data
          }
          // Add Selected Item to the DropDown
          tempFoldersDropdown.push(newSelectedItem);
        }

        // Add items to the DropDown
        this.foldersDropdown = tempFoldersDropdown;

        // Set the selected option to the first option
        this.selectedFolder = this.foldersDropdown[0].value;
      },
        error => this.errorMessage = <any>error);
  }

  public deleteItems() {

    // Create an Parent IDTONode
    // and add the Children
    let ParentDTONode: TreeNode = {
      data: '',
      label: '',
      expandedIcon: '',
      collapsedIcon: '',
      children: []
    }

    this.selectedNodes.forEach((objTreeNode: TreeNode) => {
      // Create a child IDTONode
      // and Convert TreeNode to IDOTNode
      let ChildDTONode: TreeNode = {
        data: objTreeNode.data,
        label: objTreeNode.label,
        expandedIcon: objTreeNode.expandedIcon,
        collapsedIcon: objTreeNode.collapsedIcon,
        children: []
      }

      ParentDTONode.children.push(ChildDTONode);
    });

    // Call the service
    this._FilesService.deleteFilesAndFolders(ParentDTONode)
      .subscribe(() => {
        // Refresh the files and folders
        this.getFilesAndFolders();
      },
        error => this.errorMessage = <any>error);
  }

  public openCreateFolder() {
    // Open Popup
    this.showCreateFolderPopup = true;
  }

  public CreateFolder() {

    // Construct the new folder
    var NewFolder: string = this.selectedFolder + '\\' + this.NewFolderName;

    // Call the service
    this._FilesService.createFolder(NewFolder)
      .subscribe(() => {

        // Refresh the files and folders
        this.getFilesAndFolders();

        // Close popup
        this.showCreateFolderPopup = false;
      },
        error => this.errorMessage = <any>error);
  }

  public onBeforeUploadHandler(event) {
    // called before the file(s) are uploaded
    // Send the currently selected folder in the Header
    event.formData.append("selectedFolder", this.selectedFolder);
  }

  public onUploadHandler(event) {
    // Called after the file(s) are upladed
    // Refresh the files and folders
    this.getFilesAndFolders();
  }
}
