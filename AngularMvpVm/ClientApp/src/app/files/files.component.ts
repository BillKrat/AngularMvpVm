import { Component, OnInit } from '@angular/core';
import { TreeNode, SelectItem } from 'primeng/api';
import { FilesService } from '../services/files.service';
import { IDTONode } from './DTONode';

@Component({
    selector: 'files',
    templateUrl: './files.component.html'
})
export class FilesComponent implements OnInit {
    errorMessage: string;
    fileList: TreeNode[];
    selectedNodes: TreeNode[];
    foldersDropdown: SelectItem[] = []; 
    selectedFolder: IDTONode; 
    showCreateFolderPopup: boolean = false;
    NewFolderName: string = "";

    // Register the service
    constructor(private _FilesService: FilesService) { }

    ngOnInit(): void {
        this.getFilesAndFolders();
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
        let ParentDTONode: IDTONode = {
            data: '',
            label: '',
            expandedIcon: '',
            collapsedIcon: '',
            children: [],
            parentId: 0
        }

        this.selectedNodes.forEach((objTreeNode: TreeNode) => {
            // Create a child IDTONode
            // and Convert TreeNode to IDOTNode
            let ChildDTONode: IDTONode = {
                data: objTreeNode.data,
                label: objTreeNode.label,
                expandedIcon: objTreeNode.expandedIcon,
                collapsedIcon: objTreeNode.collapsedIcon,
                children: [],
                parentId: 0
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

    public onBeforeUploadHandler(event)
    {
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
