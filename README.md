# typeahead-angular2
This is an Angular 2 autocomplete Directive based on twitter typeahead.

This directive handle complexe objects with multiple attributes and handle the case where the label isn't unique.
it basicly recieves 4 parameters : 
- @Input() name; //name for typeahead
- @Input() objectsDataSet;// a dataSet of objects , it could be any kind of object 
- @Input() handleFunction;// a callback function that is called when the object is selected , you can pass the object or whatever you want to this function.
- @Input() labelAtt;// the label attribute (object[labelAtt] is displayed to the user , it must be a string).

example : 
```
<input type="text" class="form-control" placeholder="Name..." typeaheadautocomplete [objectsDataSet]="clientList" [labelAtt]="'Firstname'" [name]="'clients'" [handleFunction]="logClient">
```

as you can see : 
clientList is an array of "client" objects , let's say {"Fistname":"Billel","Lastname":"Guerfa",....}
we use the Firstname attribute for the autocomplete list.
logClient here recieves a client object and displays it.

#Dependencies : 
just declare the typeahead script at the index.html level.
- typeahead : https://twitter.github.io/typeahead.js/
