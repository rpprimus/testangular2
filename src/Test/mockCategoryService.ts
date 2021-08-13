import { Observable, of } from "rxjs";

export class mockCategoryService {

    data: any = [];

    constructor() { }

    saveCategories(param: any): Observable<any> {
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
                "id": 97
            }
        });
    }

    getCategories(param: any): Observable<any> {
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": [
                {
                    "id": 97,
                    "sequenceNumber": 97,
                    "parentId": 96,
                    "name": "Steering wheel",
                    "title": "<p>Test Title</p>\n",
                    "description": "<p>Test Description</p>\n",
                    "isActive": false,
                    "isInfoAvailable": true
                },
                {
                    "id": 109,
                    "sequenceNumber": 96,
                    "parentId": null,
                    "name": "Men",
                    "title": null,
                    "description": null,
                    "isActive": true,
                    "isInfoAvailable": false
                },
                {
                    "id": 110,
                    "sequenceNumber": 110,
                    "parentId": 109,
                    "name": "T-Shirts",
                    "title": null,
                    "description": null,
                    "isActive": true,
                    "isInfoAvailable": false
                },
                {
                    "id": 111,
                    "sequenceNumber": 111,
                    "parentId": 110,
                    "name": "Sports T-Shirt",
                    "title": "<p>Test Title</p>\n",
                    "description": "<p>This is a test description</p>\n",
                    "isActive": true,
                    "isInfoAvailable": true
                },
                {
                    "id": 630,
                    "sequenceNumber": 635,
                    "parentId": null,
                    "name": "AB",
                    "title": "",
                    "description": "",
                    "isActive": true,
                    "isInfoAvailable": true
                },
                {
                    "id": 631,
                    "sequenceNumber": 631,
                    "parentId": 630,
                    "name": "AC",
                    "title": "",
                    "description": "",
                    "isActive": true,
                    "isInfoAvailable": true
                },
                {
                    "id": 632,
                    "sequenceNumber": 632,
                    "parentId": 630,
                    "name": "AD",
                    "title": "Testing throug 2nd Time API",
                    "description": "The Qcuik brown fox jumps over a little lazy dog.",
                    "isActive": true,
                    "isInfoAvailable": true
                }]
        });
    }

    saveInfoCategory(param: any): Observable<any> {
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
                "id": 97
            }
        })
    }

    getCategoriesInfo(param: any): Observable<any> {
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
                "id": 97,
                "title": "string",
                "description": "string"
            }
        })
    }

    updateSequence(param: any): Observable<any> {
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success"
        })
    }

    changeStatus(param: any): Observable<any> {
        return of(true);
    }

    deleteCategoryInfo(param: any): Observable<any> {
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success"
        });
    }

    loadData() {
        let response = {
            "response": [
                {
                    "id": 97,
                    "sequenceNumber": 97,
                    "parentId": 96,
                    "name": "Steering wheel",
                    "title": "<p>Test Title</p>\n",
                    "description": "<p>Test Description</p>\n",
                    "isActive": false,
                    "isInfoAvailable": true
                },
                {
                    "id": 109,
                    "sequenceNumber": 96,
                    "parentId": null,
                    "name": "Men",
                    "title": null,
                    "description": null,
                    "isActive": true,
                    "isInfoAvailable": false
                },
                {
                    "id": 110,
                    "sequenceNumber": 110,
                    "parentId": 109,
                    "name": "T-Shirts",
                    "title": null,
                    "description": null,
                    "isActive": true,
                    "isInfoAvailable": false
                },
                {
                    "id": 111,
                    "sequenceNumber": 111,
                    "parentId": 110,
                    "name": "Sports T-Shirt",
                    "title": "<p>Test Title</p>\n",
                    "description": "<p>This is a test description</p>\n",
                    "isActive": true,
                    "isInfoAvailable": true
                },
                {
                    "id": 630,
                    "sequenceNumber": 635,
                    "parentId": null,
                    "name": "AB",
                    "title": "",
                    "description": "",
                    "isActive": true,
                    "isInfoAvailable": true
                },
                {
                    "id": 631,
                    "sequenceNumber": 631,
                    "parentId": 630,
                    "name": "AC",
                    "title": "",
                    "description": "",
                    "isActive": true,
                    "isInfoAvailable": true
                },
                {
                    "id": 632,
                    "sequenceNumber": 632,
                    "parentId": 630,
                    "name": "AD",
                    "title": "Testing throug 2nd Time API",
                    "description": "The Qcuik brown fox jumps over a little lazy dog.",
                    "isActive": true,
                    "isInfoAvailable": true
                }]
        };
        this.data = this.list_to_tree(response.response);
        this.sortOnSequence(this.data);
        // this.createTreeData(response.response);
        this.enableMoveButton(response.response);
    }

    list_to_tree(list) {
        var map = {}, node, roots = [], i;
        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i; // initialize the map
            list[i].childrens = []; // initialize the children
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.parentId ) {
                if (list[map[node.parentId]]) {
                    // if you have dangling branches check that map[node.parentId] exists
                    list[map[node.parentId]].childrens.push(node);
                  }
            } else {
                roots.push(node);
            }
        }
        return roots;
    }

    isNodeExistInTree(data, element, findItem) {
        data.forEach(item => {
            if (item) {
                if (element.parentId == item.id) {
                    return findItem = item;
                } else {
                    findItem = this.isNodeExistInTree(item.childrens, element, findItem);
                }
            }
        })
        return findItem;
    }

    createTreeData(response) {
        // response.sort(function (a, b) { if (a.id < b.id) { return -1 } else { return 1 } });
        // this.data = [];
        response.forEach(element => {
            let findItem;
            findItem = this.isNodeExistInTree(this.data, element, findItem);
            Object.assign(element, { childrens: [] });
            if (findItem) {
                findItem.childrens.push(element);
            } else {
                this.data.push(element);
            }
        });
        this.sortOnSequence(this.data);
    }

    sortOnSequence(data) {
        data.sort((a, b) => {   //sort by sequence number
            let nameA = a.sequenceNumber;
            let nameB = b.sequenceNumber
            if (a.childrens.length > 0) {
                this.sortOnSequence(a.childrens);
            }
            if (b.childrens.length > 0) {
                this.sortOnSequence(b.childrens);
            }
            if (nameA < nameB) //sort string ascending
                return -1
            if (nameA > nameB)
                return 1
            return 0 //default return value (no sorting)
        });
    }

    enableMoveButton(data, enableOnlyOne?) {
        // data.forEach(element => {
        //     let siblingCategories = this.findCategoryNode(element.parentId);
        //     if (siblingCategories.length > 1) {          //show move buttons only for those nodes which have sibling
        //         element.isDragDrop = true;
        //         if (!element.showButton || enableOnlyOne) {        //if undefined, initialize checkbox value as false
        //             element.showButton = false;
        //         }
        //     }
        //     if (element.childrens.length > 0) {
        //         this.enableMoveButton(element.childrens, enableOnlyOne);
        //     }
        // });
    }

    findCategoryNode(id) {

        return([{id:1,parentId:2,sequenceNumber:1},{id:2,parentId:1,sequenceNumber:2},{id:3,parentId:null,sequenceNumber:3}]);
        // var trail = [];
        // var found = false;
        // if (id == null) {   //means if parent id is null then return the main tree data
        //     return this.data;
        // }
        // const recurse = (categoryAry) => {
        //     for (var i = 0; i < categoryAry.length; i++) {
        //         trail.push(categoryAry[i].childrens);
        //         if ((categoryAry[i].id === id)) {
        //             found = true;
        //             break;
        //         } else {
        //             if (categoryAry[i].childrens.length > 0) {
        //                 recurse(categoryAry[i].childrens);
        //                 if (found) {
        //                     break;
        //                 }
        //             }
        //         }
        //     }
        // }
        // let response = {
        //     "response": [
        //         {
        //             id: 766,
        //             sequenceNumber: 0,
        //             parentId: 769,
        //             name: "X17",
        //             title: null,
        //             description: null,
        //             isActive: true,
        //             isInfoAvailable: false,
        //             childrens: [
        //                 {
        //                     id: 768,
        //                     sequenceNumber: 0,
        //                     parentId: 766,
        //                     name: "X12",
        //                     title: null,
        //                     description: null,
        //                     isActive: true,
        //                     isInfoAvailable: false,
        //                     childrens: [],
        //                     isDragDrop: true,
        //                     showButton: true
        //                 }
        //             ],
        //             isDragDrop: true,
        //             showButton: true
        //         }
        //         // {
        //         //     "id": 632,
        //         //     "sequenceNumber": 632,
        //         //     "parentId": 97,
        //         //     "name": "Steering wheel",
        //         //     "title": "<p>Test Title</p>\n",
        //         //     "childrens": [{
        //         //         "id": 630,
        //         //         "sequenceNumber": 630,
        //         //         "parentId": 96,
        //         //         "name": "AD",
        //         //         "title": "",
        //         //         "childrens": [{
        //         //             "id": 631,
        //         //             "sequenceNumber": 631,
        //         //             "parentId": 630,
        //         //             "name": "AC",
        //         //             "title": "",
        //         //             "description": "",
        //         //             "isActive": true,
        //         //             "isInfoAvailable": true
        //         //         }],
        //         //         "description": "",
        //         //         "isActive": true,
        //         //         "isInfoAvailable": true
        //         //     }],
        //         //     "description": "<p>Test Description</p>\n",
        //         //     "isActive": false,
        //         //     "isInfoAvailable": true
        //         // }
        //     ]
        // };
        // recurse(response.response);
        // //recurse(this.data);
        // console.log("traillll",trail[trail.length -1])
        // return trail[trail.length - 1];
    }

    saveSequence(cat1, cat2) {
        // let request = [];
        // request.push({ id: cat1.id, sequence: cat1.sequenceNumber }, { id: cat2.id, sequence: cat2.sequenceNumber });
        // this.updateSequence(request).subscribe(response => {
        //   this.sharedService.onSuccess(response, null,()=>{
        //     this.scroll(cat1.id);
        //   });
        // }, error => { this.sharedService.onError(error) });
    }

    scroll(num) {
        let el = document.getElementById('cat' + num);
        el.scrollIntoView({ block: 'start', behavior: "smooth" });
    }

    disableOtherMoveButtons(selectedCategory) {
        if (selectedCategory.showButton) {
            this.enableMoveButton(this.data, true);
            selectedCategory.showButton = true;
        }
    }
}