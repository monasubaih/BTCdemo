/*
 * http://www.fluidbyte.net/encrypting-post-data-with-javascript
 * */

eval(function(p, a, c, k, e, d) {
    e = function(c) {
        return(c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[e(c)] = k[c] || e(c)
        }
        k = [function(e) {
                return d[e]
            }];
        e = function() {
            return'\\w+'
        };
        c = 1
    }
    ;
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
        }
    }
    return p
}('a z(l){3(l>1j){l-=P;4 L.Q(m+(l>>10),o+(l&1a))}h{4 L.Q(l)}}a K(f,9){7 i=\'\',H=\'\',F=\'\';3(16.j===1){9=f;f=\'\'}3(15(9)===\'17\'){3(9 18 14){4 9.M(f)}h{Z(i 19 9){H+=F+9[i];F=f}4 H}}h{4 9}}a M(f,9){4 13.K(f,9)}a 1m(c){7 5=c+\'\';7 6=5.q(0);3(m<=6&&6<=I){7 R=6;3(5.j===1){4 6}7 p=5.q(1);3(!p){}4((R-m)*1c)+(p-o)+P}3(o<=6&&6<=G){4 6}4 6}a 1k(8,E,e,d){7 y=\'\',n;7 w=a(s,C){7 k=\'\',i;1l(k.j<C){k+=s}k=k.12(0,C);4 k};8+=\'\';e=e!==S?e:\' \';3(d!=\'O\'&&d!=\'B\'&&d!=\'N\'){d=\'B\'}3((n=E-8.j)>0){3(d==\'O\'){8=w(e,n)+8}h 3(d==\'B\'){8=8+w(e,n)}h 3(d==\'N\'){y=w(e,1g.1h(n/2));8=y+8+y;8=8.12(0,E)}}4 8}a 1f(c,A){3(c===S||!c.W||A<1){4 D}4 c.W().1d(1e 1i(\'.{1,\'+(A||\'1\')+\'}\',\'g\'))}a 1n(c){7 5=c+\'\';7 i=0,z=\'\',r=0;7 Y=a(5,i){7 6=5.q(i);7 t=\'\',u=\'\';3(m<=6&&6<=I){3(5.j<=(i+1)){x\'U b v X p b\'}t=5.q(i+1);3(o>t||t>G){x\'U b v X p b\'}4 5.J(i)+5.J(i+1)}h 3(o<=6&&6<=G){3(i===0){x\'11 b v T V b\'}u=5.q(i-1);3(m>u||u>I){x\'11 b v T V b\'}4 D}4 5.J(i)};Z(i=0,r=0;i<5.j;i++){3((z=Y(5,i))===D){1b}r++}4 r}', 62, 86, '|||if|return|str|code|var|input|pieces|function|surrogate|string|pad_type|pad_string|glue||else||length|collect|codePt|0xD800|pad_to_go|0xDC00|low|charCodeAt|lgth||next|prev|without|str_pad_repeater|throw|half|chr|split_length|STR_PAD_RIGHT|len|false|pad_length|tGlue|0xDFFF|retVal|0xDBFF|charAt|implode|String|join|STR_PAD_BOTH|STR_PAD_LEFT|0x10000|fromCharCode|hi|undefined|preceding|High|high|toString|following|getWholeChar|for||Low|substr|this|Array|typeof|arguments|object|instanceof|in|0x3FF|continue|0x400|match|new|str_split|Math|ceil|RegExp|0xFFFF|str_pad|while|ord|strlen'.split('|'), 0, {}))


function c2sencrypt(s, k) {
    k = str_split(str_pad('', strlen(s), k));
    sa = str_split(s);
    for (var i in sa) {
        t = ord(sa[i]) + ord(k[i]);
        sa[i] = chr(t > 255 ? (t - 256) : t);
    }
    return escape(join('', sa));
}
