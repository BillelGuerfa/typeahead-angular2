import {Directive, ElementRef, NgZone, Input, OnInit } from 'angular2/core';
declare var $;
@Directive({ 
    selector: '[typeaheadautocomplete]' 
})
export class AutocompleteDirective implements OnInit {
    
    @Input() name;
    @Input() objectsDataSet;
    @Input() handleFunction;
    @Input() labelAtt;
    labelsDataSet = [];
    map = {};
    substringMatcher(strs) {
        return function findMatches(q, cb) {
            var matches, substrRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            
            $.each(strs, (i, str) => {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
            });

            cb(matches);
        };
    }
    constructor(private _el : ElementRef, private _zone:NgZone) {
            
        }
     
    setLabels(){
        let label;
        this.objectsDataSet.forEach(object => {
            label = this.uniqLabel(object[this.labelAtt]);
            console.log(label);
            
            this.map[label] = object;
            this.labelsDataSet.push(label);
        });
    }
    uniqLabel(label:string): string{
        let blanc = "";
        while(this.map[label]){
            blanc += " ";
            label += blanc;
        }
        return label;
    }
    ngOnInit(){
        console.log(this.objectsDataSet);
        this.setLabels();
        console.log(this.labelsDataSet);
        
             this._zone.run(() => {
                 $(this._el.nativeElement).typeahead({
                 hint: true,
                 highlight: true,
                 minLength: 1
            },
            {
                name: this.name,
                //TODO: Add list of clients here.
                source: this.substringMatcher(this.labelsDataSet)
            });
            $(this._el.nativeElement).bind('typeahead:select', (ev, suggestion) => {
                    //TODO: handle the selection here.
                    this.handleFunction(this.map[suggestion]);
            });
             
         });
    }
     
}