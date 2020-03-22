import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../services/node.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'tree-demo',
  templateUrl: './tree-demo.component.html'
 })
export class TreeDemoComponent implements OnInit {
  name: string = "Hello World";

  filesTree0: TreeNode[];
  filesTree1: TreeNode[];
  filesTree2: TreeNode[];
  filesTree3: TreeNode[];
  filesTree4: TreeNode[];
  filesTree5: TreeNode[];
  filesTree6: TreeNode[];
  filesTree7: TreeNode[];
  filesTree8: TreeNode[];
  filesTree9: TreeNode[];
  filesTree10: TreeNode[];
  filesTree11: TreeNode[];

  lazyFiles: TreeNode[];

  selectedFile: TreeNode;
  selectedFile2: TreeNode;
  selectedFile3: TreeNode;
  selectedFiles: TreeNode[];
  selectedFiles2: TreeNode[];

  items: any[];
  loading: boolean;

  constructor(private nodeService: NodeService, private messageService: MessageService) { }

  ngOnInit() {
    this.loading = true;
    this.nodeService.getFiles().then(files => this.filesTree0 = files);

    setTimeout(() => {
      this.nodeService.getFiles().then(files => this.filesTree1 = files);
      this.loading = false;
    }, 3000);

    this.nodeService.getFiles().then(files => this.filesTree2 = files);
    this.nodeService.getFiles().then(files => this.filesTree3 = files);
    this.nodeService.getFiles().then(files => this.filesTree4 = files);
    this.nodeService.getFiles().then(files => this.filesTree5 = files);
    this.nodeService.getFiles().then(files => this.filesTree6 = files);
    this.nodeService.getFiles().then(files => this.filesTree7 = files);

    this.filesTree8 = [
      {
        label: "Backup",
        data: "Backup Folder",
        expandedIcon: "pi pi-folder-open",
        collapsedIcon: "pi pi-folder"
      }
    ];

    this.filesTree9 = [
      {
        label: "Storage",
        data: "Storage Folder",
        expandedIcon: "pi pi-folder-open",
        collapsedIcon: "pi pi-folder"
      }
    ];

    this.nodeService.getFiles().then(files => this.filesTree10 = files);

    this.nodeService.getFiles().then(files => {
      this.name = JSON.stringify(this.filesTree0);
      this.filesTree11 = [{
        label: 'Root',
        children: files
      }];
    });

    this.nodeService.getFiles().then(files => this.lazyFiles = files);

    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.viewFile(this.selectedFile2) },
      { label: 'Unselect', icon: 'pi pi-close', command: (event) => this.unselectFile() }
    ];
  }

  nodeSelect(event) {
    this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
  }

  nodeUnselect(event) {
    this.messageService.add({ severity: 'info', summary: 'Node Unselected', detail: event.node.label });
  }

  nodeExpandMessage(event) {
    this.messageService.add({ severity: 'info', summary: 'Node Expanded', detail: event.node.label });
  }

  nodeExpand(event) {
    if (event.node) {
      //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
      this.nodeService.getFiles().then(nodes => event.node.children = nodes);
    }
  }

  viewFile(file: TreeNode) {
    this.messageService.add({ severity: 'info', summary: 'Node Selected with Right Click', detail: file.label });
  }

  unselectFile() {
    this.selectedFile2 = null;
  }

  expandAll() {
    this.filesTree6.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.filesTree6.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
}
