/// <reference path="../Src/knockout.validation.js" />

/************************************************
 * This is an example localization page. All of these
 * messages are the default messages for ko.validation
 * 
 * Currently ko.validation only does a single parameter replacement
 * on your message (indicated by the {0}).
 *
 * The parameter that you provide in your validation extender
 * is what is passed to your message to do the {0} replacement.
 *
 * eg: myProperty.extend({ minLength: 5 });
 * ... will provide a message of "Please enter at least 5 characters"
 * when validated
 *
 * This message replacement obviously only works with primitives
 * such as numbers and strings. We do not stringify complex objects 
 * or anything like that currently.
 */

ko.validation.localize({
    required: 'K�telez� megadni.',
    min: 'Nem lehet kisebb, mint {0}.',
    max: 'Nem lehet nagyobb, mint {0}.',
    minLength: 'Legal�bb {0} karaktert adjon meg.',
    maxLength: 'Legfeljebb {0} karaktert adjon meg.',
    pattern: 'K�rem ellen�rizze ezt az �rt�ket.',
    step: 'Az �rt�knek {0} �rt�kkel kell n�vekednie.',
    email: 'A megadott email c�m nem �rv�nyes.',
    date: 'A megadott d�tum nem �rv�nyes.',
    dateISO: 'A megadott d�tum nem �rv�nyes.',
    number: 'K�rem sz�mot adjon meg.',
    digit: 'K�rem sz�mjegyet adjon meg.',
    phoneUS: 'K�rem, hogy �rv�nyes telefonsz�mot adjon meg.',
    equal: 'Az �rt�keknek meg kel egyezni�k.',
    notEqual: 'Az �rt�keknek k�l�nb�zni�k kell.',
    unique: 'Az �rt�knek egyedieknek kell lennie.'
});