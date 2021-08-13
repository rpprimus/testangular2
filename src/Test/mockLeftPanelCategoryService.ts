import { Observable, of } from "rxjs";

export class mockLeftPanelCategoryServive{
    categoryData: any = [{
        childrens: [{
            childrens: [],
            description: null,
            expandedClass: true,
            id: 766,
            isActive: "true",
            isInfoAvailable: "false",
            name: "Xperia",
            parentId: 765,
            parents: [{
                childrens: [{
                    childrens: [],
                    description: null,
                    expandedClass: true,
                    id: 766,
                    isActive: "true",
                    isInfoAvailable: "false",
                    name: "Xperia",
                    parentId: 765,
                    parents: [],
                    sequenceNumber: 0,
                    title: null
                }],
                description: null,
                expandedClass: true,
                id: 765,
                isActive: "true",
                isInfoAvailable: "false",
                name: "IphoneX",
                parentId: null,
                parents: [],
                sequenceNumber: 0,
                title: null
            }],
            sequenceNumber: 0,
            title: null
        }],
        description: null,
        expandedClass: true,
        id: 765,
        isActive: "true",
        isInfoAvailable: "false",
        name: "IphoneX",
        parentId: null,
        parents: [],
        sequenceNumber: 0,
        title: null
    }];
    getCategories(param: any): Observable<any>{
        return of( {
          "responseCode": "S0001",
          "responseDescription": "Success",
          "response": [
            {
              "id": 90,
              "parentId": null,
              "name": "Electronics",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 127
            },
            {
              "id": 91,
              "parentId": 90,
              "name": "Mobiles",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 91
            },
            {
              "id": 92,
              "parentId": 91,
              "name": "iPhone",
              "title": "<p>Testing 1</p>\n",
              "description": "<p>Testing 2</p>\n",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 92
            },
            {
              "id": 123,
              "parentId": 92,
              "name": "Testing",
              "title": "<p>Testing&nbsp;</p>\n",
              "description": "<p>Testing 2</p>\n",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 123
            },
            {
              "id": 142,
              "parentId": 123,
              "name": "test 1",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 142
            },
            {
              "id": 109,
              "parentId": null,
              "name": "Men",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 96
            },
            {
              "id": 110,
              "parentId": 109,
              "name": "T-Shirts",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 110
            },
            {
              "id": 111,
              "parentId": 110,
              "name": "Sports T-Shirt",
              "title": "<p>Test Title</p>\n",
              "description": "<p>This is a test description</p>\n",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 111
            },
            {
              "id": 127,
              "parentId": null,
              "name": "Exhibit Components",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 109
            },
            {
              "id": 128,
              "parentId": 127,
              "name": "Banners",
              "title": "<p><strong><font color=\"null\">Banner Info</font></strong></p>\n",
              "description": "<ul>\n\t<li><strong>Bacon </strong><strong>ipsum</strong> dolor amet turkey boudin pork, pork loin hamburger ham hock tenderloin ham brisket pastrami kevin. Short ribs burgdoggen jerky, boudin cow meatball ball tip kevin ham tenderloin. Brisket pork chop chuck sirloin andouille ham hock short ribs shank tenderloin jowl pastrami short loin. Picanha sirloin ground round ribeye ham brisket.</li>\n\t<li>Jerky ham hock short ribs prosciutto landjaeger sirloin hamburger pancetta filet mignon. Pork loin shoulder hamburger capicola sausage, beef ribs ham boudin rump jowl leberkas. Drumstick filet mignon capicola rump tri-tip biltong short ribs bacon ham hock short loin chicken swine andouille. Ribeye jerky leberkas, drumstick pancetta pork chop kevin flank kielbasa ham hock tenderloin ground round. Tongue burgdoggen jerky andouille short loin meatloaf. Tri-tip meatball pork belly jowl meatloaf pork loin turkey rump prosciutto chicken venison. Chuck turducken pork chop jowl meatloaf meatball ball tip alcatra beef ribs hamburger salami andouille.</li>\n\t<li>Swine meatball kielbasa, hamburger pork loin alcatra chuck. Tri-tip shoulder spare ribs burgdoggen tail leberkas swine landjaeger jerky short ribs. Ham hock sirloin andouille shankle ribeye ground round fatback doner chuck rump. Ribeye flank shank andouille.</li>\n</ul>\n",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 129
            },
            {
              "id": 129,
              "parentId": 127,
              "name": "Pop-up Displays",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 128
            },
            {
              "id": 144,
              "parentId": null,
              "name": "Birlasoft",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 149
            },
            {
              "id": 145,
              "parentId": 144,
              "name": "Birlasoft child",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 145
            },
            {
              "id": 146,
              "parentId": 145,
              "name": "Birlasoft 2nd Child",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 645
            },
            {
              "id": 147,
              "parentId": 146,
              "name": "Birlasoft 3rd Child",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 148
            },
            {
              "id": 148,
              "parentId": 146,
              "name": "Birlasoft 4rth Child",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 147
            },
            {
              "id": 645,
              "parentId": 145,
              "name": "Birla 2nd Level",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 146
            },
            {
              "id": 149,
              "parentId": null,
              "name": "TCS",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 144
            },
            {
              "id": 150,
              "parentId": 149,
              "name": "TCS child",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 150
            },
            {
              "id": 151,
              "parentId": 150,
              "name": "TCS 2nd Child",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 151
            },
            {
              "id": 152,
              "parentId": 151,
              "name": "TCS 3rd Child",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 152
            },
            {
              "id": 153,
              "parentId": 151,
              "name": "TCS 4rth Child",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 153
            },
            {
              "id": 154,
              "parentId": null,
              "name": "Birlasoft",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 154
            },
            {
              "id": 155,
              "parentId": null,
              "name": "Great Parent",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 155
            },
            {
              "id": 156,
              "parentId": 155,
              "name": "Great Parent child",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 156
            },
            {
              "id": 157,
              "parentId": 156,
              "name": "Great Parent 2nd Child",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 157
            },
            {
              "id": 158,
              "parentId": 157,
              "name": "Great Parent 3rd Child",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 158
            },
            {
              "id": 584,
              "parentId": null,
              "name": "Great Grea",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 584
            },
            {
              "id": 585,
              "parentId": 584,
              "name": "Great child 2",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 585
            },
            {
              "id": 586,
              "parentId": null,
              "name": "Main",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 586
            },
            {
              "id": 587,
              "parentId": 586,
              "name": "Great child 6",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 587
            },
            {
              "id": 588,
              "parentId": 586,
              "name": "Great child 9",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 588
            },
            {
              "id": 589,
              "parentId": 588,
              "name": "Great child 10",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 589
            },
            {
              "id": 630,
              "parentId": null,
              "name": "AB",
              "title": "",
              "description": "",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 630
            },
            {
              "id": 631,
              "parentId": 630,
              "name": "AC",
              "title": "",
              "description": "",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 631
            },
            {
              "id": 632,
              "parentId": 630,
              "name": "AD",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 632
            },
            {
              "id": 633,
              "parentId": 630,
              "name": "AE",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 633
            },
            {
              "id": 636,
              "parentId": 631,
              "name": "AF",
              "title": "",
              "description": "",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 634
            },
            {
              "id": 637,
              "parentId": 631,
              "name": "AF",
              "title": "",
              "description": "",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 637
            },
            {
              "id": 644,
              "parentId": 631,
              "name": "AFc",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 644
            },
            {
              "id": 635,
              "parentId": null,
              "name": "AB",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 635
            },
            {
              "id": 643,
              "parentId": null,
              "name": "ABc",
              "title": "Testing throug 2nd Time API",
              "description": "The Qcuik brown fox jumps over a little lazy dog.",
              "isActive": "true",
              "isInfoAvailable": "true",
              "sequenceNumber": 643
            },
            {
              "id": 669,
              "parentId": null,
              "name": "Development branch",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 669
            },
            {
              "id": 765,
              "parentId": null,
              "name": "IphoneX",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 766,
              "parentId": 765,
              "name": "Xperia",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 767,
              "parentId": 766,
              "name": "X11",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 768,
              "parentId": 766,
              "name": "X12",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 769,
              "parentId": 766,
              "name": "X13",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 770,
              "parentId": 766,
              "name": "X14",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 771,
              "parentId": 766,
              "name": "X15",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 772,
              "parentId": 766,
              "name": "X16",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 773,
              "parentId": 766,
              "name": "X17",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 774,
              "parentId": 766,
              "name": "X18",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 775,
              "parentId": 766,
              "name": "X19",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 777,
              "parentId": null,
              "name": "Moto",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 778,
              "parentId": 777,
              "name": "GX",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 779,
              "parentId": 778,
              "name": "Xperia",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 780,
              "parentId": 779,
              "name": "X11",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 791,
              "parentId": 779,
              "name": "X22",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 792,
              "parentId": 779,
              "name": "X23",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 793,
              "parentId": 779,
              "name": "X24",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            },
            {
              "id": 794,
              "parentId": 779,
              "name": "X25",
              "title": null,
              "description": null,
              "isActive": "true",
              "isInfoAvailable": "false",
              "sequenceNumber": 0
            }
          ]
        })
      }
}
