import { Component, Input } from '@angular/core';
import { CategoryService } from '../category.service';
import { debug } from 'util';

@Component({
  selector: 'app-category-drag-drop',
  templateUrl: './category-drag-drop.component.html',
  styleUrls: ['./category-drag-drop.component.scss']
})
export class CategoryDragDropComponent {

  @Input('data') data: any;

  constructor(private categoryService: CategoryService) { }

  /**
   * Move the position up of the current data by 1 position and for that
   * firstly find an array containing all the siblings of that node and find the index of current node
   * Swap the sequence number of both nodes for updating in the server
   * also swap the dom position of both nodes for display
   */
  moveUp() {
    let siblingCategories = this.categoryService.findCategoryNode(this.data.parentId);
    //let index = siblingCategories.indexOf(this.data);
    //indexOf() wasn't working while Unit Testing,hence chahnged it to findIndex() and implemented JSON.stringify()
    let index = siblingCategories.findIndex(x => JSON.stringify(x) == JSON.stringify(this.data));
    if (index > 0) {
      let temp = siblingCategories[index].sequenceNumber;
      siblingCategories[index].sequenceNumber = siblingCategories[index - 1].sequenceNumber;
      siblingCategories[index - 1].sequenceNumber = temp;

      let temp1 = siblingCategories[index];
      siblingCategories[index] = siblingCategories[index - 1];
      siblingCategories[index - 1] = temp1;
      this.categoryService.saveSequence(siblingCategories[index - 1], siblingCategories[index]);
    }
  }

  /**
   * Move the position down of the current data by 1 position and for that
   * firstly find an array containing all the siblings of that node and find the index of current node
   * Swap the sequence number of both nodes for updating in the server
   * also swap the dom position of both nodes for display
   */
  moveDown() {
    let siblingCategories = this.categoryService.findCategoryNode(this.data.parentId);
    //let index = siblingCategories.indexOf(this.data);
    //indexOf() wasn't working while Unit Testing,hence chahnged it to findIndex() and implemented JSON.stringify()
    let index = siblingCategories.findIndex(x => JSON.stringify(x) == JSON.stringify(this.data));
    if (index < siblingCategories.length - 1) {
      let temp = siblingCategories[index].sequenceNumber;
      siblingCategories[index].sequenceNumber = siblingCategories[index + 1].sequenceNumber;
      siblingCategories[index + 1].sequenceNumber = temp;

      let temp1 = siblingCategories[index];
      siblingCategories[index] = siblingCategories[index + 1];
      siblingCategories[index + 1] = temp1;
      this.categoryService.saveSequence(siblingCategories[index], siblingCategories[index + 1]);
    }

  }



}
