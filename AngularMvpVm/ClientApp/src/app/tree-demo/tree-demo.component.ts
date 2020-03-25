import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../services/node.service';
import { MessageService } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { Subscription, Observable } from 'rxjs';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { MenuItemContent, MenuModule } from 'primeng/menu';

@Component({
  selector: 'tree-demo',
  templateUrl: './tree-demo.component.html'
 })
export class TreeDemoComponent implements OnInit {
  name: string = "Hello World";

  @ViewChild('expandingTree')
  expandingTree: Tree;

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
  filesTree12: TreeNode[];
  filesTree13: TreeNode[];

  lazyFiles: TreeNode[];

  selectedFile: TreeNode;
  selectedFile2: TreeNode;
  selectedFile3: TreeNode;
  selectedFiles: TreeNode[];
  selectedFiles2: TreeNode[];

  subscription: Subscription[];

  items: any[];
  loading: boolean;

  constructor(private nodeSvc: NodeService, private messageService: MessageService) { }

  ngOnInit() {
    this.loading = true;

    const nodeService = this.nodeSvc.getFiles().pipe(files => files);


    nodeService.subscribe(files => this.filesTree0 = this.deepClone(files));

    setTimeout(() => {
      nodeService.subscribe(files => this.filesTree1 = this.deepClone(files));
      this.loading = false;
    }, 3000);

    nodeService.subscribe(files => this.filesTree2 = this.deepClone(files));
    nodeService.subscribe(files => this.filesTree3 = this.deepClone(files));
    nodeService.subscribe(files => this.filesTree4 = this.deepClone(files));
    nodeService.subscribe(files => this.filesTree5 = this.deepClone(files));
    nodeService.subscribe(files => this.filesTree6 = this.deepClone(files));
    nodeService.subscribe(files => this.filesTree7 = this.deepClone(files));

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

    nodeService.subscribe(files => this.filesTree10 = this.deepClone(files));

    nodeService.subscribe(files => {
      this.name = JSON.stringify(this.filesTree0);
      this.filesTree11 = [{
        label: 'Root',
        children: files
      }];
    });

    nodeService.subscribe(files => this.filesTree12 = this.deepClone(files));
    nodeService.subscribe(files => this.filesTree13 = this.deepClone(files));

    nodeService.subscribe(files => this.lazyFiles = this.deepClone(files));

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
      const nodeService = this.nodeSvc.getFiles().pipe(files => files);

      //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
      nodeService.subscribe(nodes => event.node.children = nodes);
    }
  }

  viewFile(file: TreeNode) {
    this.messageService.add({ severity: 'info', summary: 'Node Selected with Right Click', detail: file.label });
  }

  unselectFile() {
    this.selectedFile2 = null;
  }

  expandAll() {
    this.filesTree10.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.filesTree10.forEach(node => {
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

  private deepClone(obj) : TreeNode[] {
    // return value is input is not an Object or Array.
    if (typeof (obj) !== 'object' || obj === null) {
      return obj;
    }

    let clone;

    if (Array.isArray(obj)) {
      clone = obj.slice();  // unlink Array reference.
    } else {
      clone = Object.assign({}, obj); // Unlink Object reference.
    }

    let keys = Object.keys(clone);

    for (let i = 0; i < keys.length; i++) {
      clone[keys[i]] = this.deepClone(clone[keys[i]]); // recursively unlink reference to nested objects.
    }
    return clone; // return unlinked clone.
  }

}
