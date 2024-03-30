export const jsInit = (serializations) => {
    // TODO: copy blog code so that combined cluster is built
    const node = document.getElementById('roadmap');
    if (node) {
        console.debug(serializations);
        Elm.Main.init({ node });
    }
};

// -- (function(scope){
// -- 'use strict';

function F(arity, fun, wrapper) {
    wrapper.a = arity;
    wrapper.f = fun;
    return wrapper;
  }
  
  function F2(fun) {
    return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
  }
  function F3(fun) {
    return F(3, fun, function(a) {
      return function(b) { return function(c) { return fun(a, b, c); }; };
    });
  }
  function F4(fun) {
    return F(4, fun, function(a) { return function(b) { return function(c) {
      return function(d) { return fun(a, b, c, d); }; }; };
    });
  }
  function F5(fun) {
    return F(5, fun, function(a) { return function(b) { return function(c) {
      return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
    });
  }
  function F6(fun) {
    return F(6, fun, function(a) { return function(b) { return function(c) {
      return function(d) { return function(e) { return function(f) {
      return fun(a, b, c, d, e, f); }; }; }; }; };
    });
  }
  function F7(fun) {
    return F(7, fun, function(a) { return function(b) { return function(c) {
      return function(d) { return function(e) { return function(f) {
      return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
    });
  }
  function F8(fun) {
    return F(8, fun, function(a) { return function(b) { return function(c) {
      return function(d) { return function(e) { return function(f) {
      return function(g) { return function(h) {
      return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
    });
  }
  function F9(fun) {
    return F(9, fun, function(a) { return function(b) { return function(c) {
      return function(d) { return function(e) { return function(f) {
      return function(g) { return function(h) { return function(i) {
      return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
    });
  }
  
  function A2(fun, a, b) {
    return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
  }
  function A3(fun, a, b, c) {
    return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
  }
  function A4(fun, a, b, c, d) {
    return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
  }
  function A5(fun, a, b, c, d, e) {
    return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
  }
  function A6(fun, a, b, c, d, e, f) {
    return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
  }
  function A7(fun, a, b, c, d, e, f, g) {
    return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
  }
  function A8(fun, a, b, c, d, e, f, g, h) {
    return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
  }
  function A9(fun, a, b, c, d, e, f, g, h, i) {
    return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
  }
  
  console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');
  
  
  // EQUALITY
  
  function _Utils_eq(x, y)
  {
      for (
          var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
          isEqual && (pair = stack.pop());
          isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
          )
      {}
  
      return isEqual;
  }
  
  function _Utils_eqHelp(x, y, depth, stack)
  {
      if (x === y)
      {
          return true;
      }
  
      if (typeof x !== 'object' || x === null || y === null)
      {
          typeof x === 'function' && _Debug_crash(5);
          return false;
      }
  
      if (depth > 100)
      {
          stack.push(_Utils_Tuple2(x,y));
          return true;
      }
  
      /**/
      if (x.$ === 'Set_elm_builtin')
      {
          x = $elm$core$Set$toList(x);
          y = $elm$core$Set$toList(y);
      }
      if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
      {
          x = $elm$core$Dict$toList(x);
          y = $elm$core$Dict$toList(y);
      }
      //*/
  
      /**_UNUSED/
      if (x.$ < 0)
      {
          x = $elm$core$Dict$toList(x);
          y = $elm$core$Dict$toList(y);
      }
      //*/
  
      for (var key in x)
      {
          if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
          {
              return false;
          }
      }
      return true;
  }
  
  var _Utils_equal = F2(_Utils_eq);
  var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });
  
  
  
  // COMPARISONS
  
  // Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
  // the particular integer values assigned to LT, EQ, and GT.
  
  function _Utils_cmp(x, y, ord)
  {
      if (typeof x !== 'object')
      {
          return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
      }
  
      /**/
      if (x instanceof String)
      {
          var a = x.valueOf();
          var b = y.valueOf();
          return a === b ? 0 : a < b ? -1 : 1;
      }
      //*/
  
      /**_UNUSED/
      if (typeof x.$ === 'undefined')
      //*/
      /**/
      if (x.$[0] === '#')
      //*/
      {
          return (ord = _Utils_cmp(x.a, y.a))
              ? ord
              : (ord = _Utils_cmp(x.b, y.b))
                  ? ord
                  : _Utils_cmp(x.c, y.c);
      }
  
      // traverse conses until end of a list or a mismatch
      for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
      return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
  }
  
  var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
  var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
  var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
  var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });
  
  var _Utils_compare = F2(function(x, y)
  {
      var n = _Utils_cmp(x, y);
      return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
  });
  
  
  // COMMON VALUES
  
  var _Utils_Tuple0_UNUSED = 0;
  var _Utils_Tuple0 = { $: '#0' };
  
  function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
  function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }
  
  function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
  function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }
  
  function _Utils_chr_UNUSED(c) { return c; }
  function _Utils_chr(c) { return new String(c); }
  
  
  // RECORDS
  
  function _Utils_update(oldRecord, updatedFields)
  {
      var newRecord = {};
  
      for (var key in oldRecord)
      {
          newRecord[key] = oldRecord[key];
      }
  
      for (var key in updatedFields)
      {
          newRecord[key] = updatedFields[key];
      }
  
      return newRecord;
  }
  
  
  // APPEND
  
  var _Utils_append = F2(_Utils_ap);
  
  function _Utils_ap(xs, ys)
  {
      // append Strings
      if (typeof xs === 'string')
      {
          return xs + ys;
      }
  
      // append Lists
      if (!xs.b)
      {
          return ys;
      }
      var root = _List_Cons(xs.a, ys);
      xs = xs.b
      for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
      {
          curr = curr.b = _List_Cons(xs.a, ys);
      }
      return root;
  }
  
  
  
  var _List_Nil_UNUSED = { $: 0 };
  var _List_Nil = { $: '[]' };
  
  function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
  function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }
  
  
  var _List_cons = F2(_List_Cons);
  
  function _List_fromArray(arr)
  {
      var out = _List_Nil;
      for (var i = arr.length; i--; )
      {
          out = _List_Cons(arr[i], out);
      }
      return out;
  }
  
  function _List_toArray(xs)
  {
      for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
      {
          out.push(xs.a);
      }
      return out;
  }
  
  var _List_map2 = F3(function(f, xs, ys)
  {
      for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
      {
          arr.push(A2(f, xs.a, ys.a));
      }
      return _List_fromArray(arr);
  });
  
  var _List_map3 = F4(function(f, xs, ys, zs)
  {
      for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
      {
          arr.push(A3(f, xs.a, ys.a, zs.a));
      }
      return _List_fromArray(arr);
  });
  
  var _List_map4 = F5(function(f, ws, xs, ys, zs)
  {
      for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
      {
          arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
      }
      return _List_fromArray(arr);
  });
  
  var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
  {
      for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
      {
          arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
      }
      return _List_fromArray(arr);
  });
  
  var _List_sortBy = F2(function(f, xs)
  {
      return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
          return _Utils_cmp(f(a), f(b));
      }));
  });
  
  var _List_sortWith = F2(function(f, xs)
  {
      return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
          var ord = A2(f, a, b);
          return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
      }));
  });
  
  
  
  var _JsArray_empty = [];
  
  function _JsArray_singleton(value)
  {
      return [value];
  }
  
  function _JsArray_length(array)
  {
      return array.length;
  }
  
  var _JsArray_initialize = F3(function(size, offset, func)
  {
      var result = new Array(size);
  
      for (var i = 0; i < size; i++)
      {
          result[i] = func(offset + i);
      }
  
      return result;
  });
  
  var _JsArray_initializeFromList = F2(function (max, ls)
  {
      var result = new Array(max);
  
      for (var i = 0; i < max && ls.b; i++)
      {
          result[i] = ls.a;
          ls = ls.b;
      }
  
      result.length = i;
      return _Utils_Tuple2(result, ls);
  });
  
  var _JsArray_unsafeGet = F2(function(index, array)
  {
      return array[index];
  });
  
  var _JsArray_unsafeSet = F3(function(index, value, array)
  {
      var length = array.length;
      var result = new Array(length);
  
      for (var i = 0; i < length; i++)
      {
          result[i] = array[i];
      }
  
      result[index] = value;
      return result;
  });
  
  var _JsArray_push = F2(function(value, array)
  {
      var length = array.length;
      var result = new Array(length + 1);
  
      for (var i = 0; i < length; i++)
      {
          result[i] = array[i];
      }
  
      result[length] = value;
      return result;
  });
  
  var _JsArray_foldl = F3(function(func, acc, array)
  {
      var length = array.length;
  
      for (var i = 0; i < length; i++)
      {
          acc = A2(func, array[i], acc);
      }
  
      return acc;
  });
  
  var _JsArray_foldr = F3(function(func, acc, array)
  {
      for (var i = array.length - 1; i >= 0; i--)
      {
          acc = A2(func, array[i], acc);
      }
  
      return acc;
  });
  
  var _JsArray_map = F2(function(func, array)
  {
      var length = array.length;
      var result = new Array(length);
  
      for (var i = 0; i < length; i++)
      {
          result[i] = func(array[i]);
      }
  
      return result;
  });
  
  var _JsArray_indexedMap = F3(function(func, offset, array)
  {
      var length = array.length;
      var result = new Array(length);
  
      for (var i = 0; i < length; i++)
      {
          result[i] = A2(func, offset + i, array[i]);
      }
  
      return result;
  });
  
  var _JsArray_slice = F3(function(from, to, array)
  {
      return array.slice(from, to);
  });
  
  var _JsArray_appendN = F3(function(n, dest, source)
  {
      var destLen = dest.length;
      var itemsToCopy = n - destLen;
  
      if (itemsToCopy > source.length)
      {
          itemsToCopy = source.length;
      }
  
      var size = destLen + itemsToCopy;
      var result = new Array(size);
  
      for (var i = 0; i < destLen; i++)
      {
          result[i] = dest[i];
      }
  
      for (var i = 0; i < itemsToCopy; i++)
      {
          result[i + destLen] = source[i];
      }
  
      return result;
  });
  
  
  
  // LOG
  
  var _Debug_log_UNUSED = F2(function(tag, value)
  {
      return value;
  });
  
  var _Debug_log = F2(function(tag, value)
  {
      console.log(tag + ': ' + _Debug_toString(value));
      return value;
  });
  
  
  // TODOS
  
  function _Debug_todo(moduleName, region)
  {
      return function(message) {
          _Debug_crash(8, moduleName, region, message);
      };
  }
  
  function _Debug_todoCase(moduleName, region, value)
  {
      return function(message) {
          _Debug_crash(9, moduleName, region, value, message);
      };
  }
  
  
  // TO STRING
  
  function _Debug_toString_UNUSED(value)
  {
      return '<internals>';
  }
  
  function _Debug_toString(value)
  {
      return _Debug_toAnsiString(false, value);
  }
  
  function _Debug_toAnsiString(ansi, value)
  {
      if (typeof value === 'function')
      {
          return _Debug_internalColor(ansi, '<function>');
      }
  
      if (typeof value === 'boolean')
      {
          return _Debug_ctorColor(ansi, value ? 'True' : 'False');
      }
  
      if (typeof value === 'number')
      {
          return _Debug_numberColor(ansi, value + '');
      }
  
      if (value instanceof String)
      {
          return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
      }
  
      if (typeof value === 'string')
      {
          return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
      }
  
      if (typeof value === 'object' && '$' in value)
      {
          var tag = value.$;
  
          if (typeof tag === 'number')
          {
              return _Debug_internalColor(ansi, '<internals>');
          }
  
          if (tag[0] === '#')
          {
              var output = [];
              for (var k in value)
              {
                  if (k === '$') continue;
                  output.push(_Debug_toAnsiString(ansi, value[k]));
              }
              return '(' + output.join(',') + ')';
          }
  
          if (tag === 'Set_elm_builtin')
          {
              return _Debug_ctorColor(ansi, 'Set')
                  + _Debug_fadeColor(ansi, '.fromList') + ' '
                  + _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
          }
  
          if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
          {
              return _Debug_ctorColor(ansi, 'Dict')
                  + _Debug_fadeColor(ansi, '.fromList') + ' '
                  + _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
          }
  
          if (tag === 'Array_elm_builtin')
          {
              return _Debug_ctorColor(ansi, 'Array')
                  + _Debug_fadeColor(ansi, '.fromList') + ' '
                  + _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
          }
  
          if (tag === '::' || tag === '[]')
          {
              var output = '[';
  
              value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)
  
              for (; value.b; value = value.b) // WHILE_CONS
              {
                  output += ',' + _Debug_toAnsiString(ansi, value.a);
              }
              return output + ']';
          }
  
          var output = '';
          for (var i in value)
          {
              if (i === '$') continue;
              var str = _Debug_toAnsiString(ansi, value[i]);
              var c0 = str[0];
              var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
              output += ' ' + (parenless ? str : '(' + str + ')');
          }
          return _Debug_ctorColor(ansi, tag) + output;
      }
  
      if (typeof DataView === 'function' && value instanceof DataView)
      {
          return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
      }
  
      if (typeof File !== 'undefined' && value instanceof File)
      {
          return _Debug_internalColor(ansi, '<' + value.name + '>');
      }
  
      if (typeof value === 'object')
      {
          var output = [];
          for (var key in value)
          {
              var field = key[0] === '_' ? key.slice(1) : key;
              output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
          }
          if (output.length === 0)
          {
              return '{}';
          }
          return '{ ' + output.join(', ') + ' }';
      }
  
      return _Debug_internalColor(ansi, '<internals>');
  }
  
  function _Debug_addSlashes(str, isChar)
  {
      var s = str
          .replace(/\\/g, '\\\\')
          .replace(/\n/g, '\\n')
          .replace(/\t/g, '\\t')
          .replace(/\r/g, '\\r')
          .replace(/\v/g, '\\v')
          .replace(/\0/g, '\\0');
  
      if (isChar)
      {
          return s.replace(/\'/g, '\\\'');
      }
      else
      {
          return s.replace(/\"/g, '\\"');
      }
  }
  
  function _Debug_ctorColor(ansi, string)
  {
      return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
  }
  
  function _Debug_numberColor(ansi, string)
  {
      return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
  }
  
  function _Debug_stringColor(ansi, string)
  {
      return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
  }
  
  function _Debug_charColor(ansi, string)
  {
      return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
  }
  
  function _Debug_fadeColor(ansi, string)
  {
      return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
  }
  
  function _Debug_internalColor(ansi, string)
  {
      return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
  }
  
  function _Debug_toHexDigit(n)
  {
      return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
  }
  
  
  // CRASH
  
  
  function _Debug_crash_UNUSED(identifier)
  {
      throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
  }
  
  
  function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
  {
      switch(identifier)
      {
          case 0:
              throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');
  
          case 1:
              throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');
  
          case 2:
              var jsonErrorString = fact1;
              throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);
  
          case 3:
              var portName = fact1;
              throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');
  
          case 4:
              var portName = fact1;
              var problem = fact2;
              throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);
  
          case 5:
              throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');
  
          case 6:
              var moduleName = fact1;
              throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');
  
          case 8:
              var moduleName = fact1;
              var region = fact2;
              var message = fact3;
              throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);
  
          case 9:
              var moduleName = fact1;
              var region = fact2;
              var value = fact3;
              var message = fact4;
              throw new Error(
                  'TODO in module `' + moduleName + '` from the `case` expression '
                  + _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
                  + _Debug_toString(value).replace('\n', '\n    ')
                  + '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
              );
  
          case 10:
              throw new Error('Bug in https://github.com/elm/virtual-dom/issues');
  
          case 11:
              throw new Error('Cannot perform mod 0. Division by zero error.');
      }
  }
  
  function _Debug_regionToString(region)
  {
      if (region.start.line === region.end.line)
      {
          return 'on line ' + region.start.line;
      }
      return 'on lines ' + region.start.line + ' through ' + region.end.line;
  }
  
  
  
  // MATH
  
  var _Basics_add = F2(function(a, b) { return a + b; });
  var _Basics_sub = F2(function(a, b) { return a - b; });
  var _Basics_mul = F2(function(a, b) { return a * b; });
  var _Basics_fdiv = F2(function(a, b) { return a / b; });
  var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
  var _Basics_pow = F2(Math.pow);
  
  var _Basics_remainderBy = F2(function(b, a) { return a % b; });
  
  // https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
  var _Basics_modBy = F2(function(modulus, x)
  {
      var answer = x % modulus;
      return modulus === 0
          ? _Debug_crash(11)
          :
      ((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
          ? answer + modulus
          : answer;
  });
  
  
  // TRIGONOMETRY
  
  var _Basics_pi = Math.PI;
  var _Basics_e = Math.E;
  var _Basics_cos = Math.cos;
  var _Basics_sin = Math.sin;
  var _Basics_tan = Math.tan;
  var _Basics_acos = Math.acos;
  var _Basics_asin = Math.asin;
  var _Basics_atan = Math.atan;
  var _Basics_atan2 = F2(Math.atan2);
  
  
  // MORE MATH
  
  function _Basics_toFloat(x) { return x; }
  function _Basics_truncate(n) { return n | 0; }
  function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }
  
  var _Basics_ceiling = Math.ceil;
  var _Basics_floor = Math.floor;
  var _Basics_round = Math.round;
  var _Basics_sqrt = Math.sqrt;
  var _Basics_log = Math.log;
  var _Basics_isNaN = isNaN;
  
  
  // BOOLEANS
  
  function _Basics_not(bool) { return !bool; }
  var _Basics_and = F2(function(a, b) { return a && b; });
  var _Basics_or  = F2(function(a, b) { return a || b; });
  var _Basics_xor = F2(function(a, b) { return a !== b; });
  
  
  
  var _String_cons = F2(function(chr, str)
  {
      return chr + str;
  });
  
  function _String_uncons(string)
  {
      var word = string.charCodeAt(0);
      return !isNaN(word)
          ? $elm$core$Maybe$Just(
              0xD800 <= word && word <= 0xDBFF
                  ? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
                  : _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
          )
          : $elm$core$Maybe$Nothing;
  }
  
  var _String_append = F2(function(a, b)
  {
      return a + b;
  });
  
  function _String_length(str)
  {
      return str.length;
  }
  
  var _String_map = F2(function(func, string)
  {
      var len = string.length;
      var array = new Array(len);
      var i = 0;
      while (i < len)
      {
          var word = string.charCodeAt(i);
          if (0xD800 <= word && word <= 0xDBFF)
          {
              array[i] = func(_Utils_chr(string[i] + string[i+1]));
              i += 2;
              continue;
          }
          array[i] = func(_Utils_chr(string[i]));
          i++;
      }
      return array.join('');
  });
  
  var _String_filter = F2(function(isGood, str)
  {
      var arr = [];
      var len = str.length;
      var i = 0;
      while (i < len)
      {
          var char = str[i];
          var word = str.charCodeAt(i);
          i++;
          if (0xD800 <= word && word <= 0xDBFF)
          {
              char += str[i];
              i++;
          }
  
          if (isGood(_Utils_chr(char)))
          {
              arr.push(char);
          }
      }
      return arr.join('');
  });
  
  function _String_reverse(str)
  {
      var len = str.length;
      var arr = new Array(len);
      var i = 0;
      while (i < len)
      {
          var word = str.charCodeAt(i);
          if (0xD800 <= word && word <= 0xDBFF)
          {
              arr[len - i] = str[i + 1];
              i++;
              arr[len - i] = str[i - 1];
              i++;
          }
          else
          {
              arr[len - i] = str[i];
              i++;
          }
      }
      return arr.join('');
  }
  
  var _String_foldl = F3(function(func, state, string)
  {
      var len = string.length;
      var i = 0;
      while (i < len)
      {
          var char = string[i];
          var word = string.charCodeAt(i);
          i++;
          if (0xD800 <= word && word <= 0xDBFF)
          {
              char += string[i];
              i++;
          }
          state = A2(func, _Utils_chr(char), state);
      }
      return state;
  });
  
  var _String_foldr = F3(function(func, state, string)
  {
      var i = string.length;
      while (i--)
      {
          var char = string[i];
          var word = string.charCodeAt(i);
          if (0xDC00 <= word && word <= 0xDFFF)
          {
              i--;
              char = string[i] + char;
          }
          state = A2(func, _Utils_chr(char), state);
      }
      return state;
  });
  
  var _String_split = F2(function(sep, str)
  {
      return str.split(sep);
  });
  
  var _String_join = F2(function(sep, strs)
  {
      return strs.join(sep);
  });
  
  var _String_slice = F3(function(start, end, str) {
      return str.slice(start, end);
  });
  
  function _String_trim(str)
  {
      return str.trim();
  }
  
  function _String_trimLeft(str)
  {
      return str.replace(/^\s+/, '');
  }
  
  function _String_trimRight(str)
  {
      return str.replace(/\s+$/, '');
  }
  
  function _String_words(str)
  {
      return _List_fromArray(str.trim().split(/\s+/g));
  }
  
  function _String_lines(str)
  {
      return _List_fromArray(str.split(/\r\n|\r|\n/g));
  }
  
  function _String_toUpper(str)
  {
      return str.toUpperCase();
  }
  
  function _String_toLower(str)
  {
      return str.toLowerCase();
  }
  
  var _String_any = F2(function(isGood, string)
  {
      var i = string.length;
      while (i--)
      {
          var char = string[i];
          var word = string.charCodeAt(i);
          if (0xDC00 <= word && word <= 0xDFFF)
          {
              i--;
              char = string[i] + char;
          }
          if (isGood(_Utils_chr(char)))
          {
              return true;
          }
      }
      return false;
  });
  
  var _String_all = F2(function(isGood, string)
  {
      var i = string.length;
      while (i--)
      {
          var char = string[i];
          var word = string.charCodeAt(i);
          if (0xDC00 <= word && word <= 0xDFFF)
          {
              i--;
              char = string[i] + char;
          }
          if (!isGood(_Utils_chr(char)))
          {
              return false;
          }
      }
      return true;
  });
  
  var _String_contains = F2(function(sub, str)
  {
      return str.indexOf(sub) > -1;
  });
  
  var _String_startsWith = F2(function(sub, str)
  {
      return str.indexOf(sub) === 0;
  });
  
  var _String_endsWith = F2(function(sub, str)
  {
      return str.length >= sub.length &&
          str.lastIndexOf(sub) === str.length - sub.length;
  });
  
  var _String_indexes = F2(function(sub, str)
  {
      var subLen = sub.length;
  
      if (subLen < 1)
      {
          return _List_Nil;
      }
  
      var i = 0;
      var is = [];
  
      while ((i = str.indexOf(sub, i)) > -1)
      {
          is.push(i);
          i = i + subLen;
      }
  
      return _List_fromArray(is);
  });
  
  
  // TO STRING
  
  function _String_fromNumber(number)
  {
      return number + '';
  }
  
  
  // INT CONVERSIONS
  
  function _String_toInt(str)
  {
      var total = 0;
      var code0 = str.charCodeAt(0);
      var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;
  
      for (var i = start; i < str.length; ++i)
      {
          var code = str.charCodeAt(i);
          if (code < 0x30 || 0x39 < code)
          {
              return $elm$core$Maybe$Nothing;
          }
          total = 10 * total + code - 0x30;
      }
  
      return i == start
          ? $elm$core$Maybe$Nothing
          : $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
  }
  
  
  // FLOAT CONVERSIONS
  
  function _String_toFloat(s)
  {
      // check if it is a hex, octal, or binary number
      if (s.length === 0 || /[\sxbo]/.test(s))
      {
          return $elm$core$Maybe$Nothing;
      }
      var n = +s;
      // faster isNaN check
      return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
  }
  
  function _String_fromList(chars)
  {
      return _List_toArray(chars).join('');
  }
  
  
  
  
  function _Char_toCode(char)
  {
      var code = char.charCodeAt(0);
      if (0xD800 <= code && code <= 0xDBFF)
      {
          return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
      }
      return code;
  }
  
  function _Char_fromCode(code)
  {
      return _Utils_chr(
          (code < 0 || 0x10FFFF < code)
              ? '\uFFFD'
              :
          (code <= 0xFFFF)
              ? String.fromCharCode(code)
              :
          (code -= 0x10000,
              String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
          )
      );
  }
  
  function _Char_toUpper(char)
  {
      return _Utils_chr(char.toUpperCase());
  }
  
  function _Char_toLower(char)
  {
      return _Utils_chr(char.toLowerCase());
  }
  
  function _Char_toLocaleUpper(char)
  {
      return _Utils_chr(char.toLocaleUpperCase());
  }
  
  function _Char_toLocaleLower(char)
  {
      return _Utils_chr(char.toLocaleLowerCase());
  }
  
  
  
  /**/
  function _Json_errorToString(error)
  {
      return $elm$json$Json$Decode$errorToString(error);
  }
  //*/
  
  
  // CORE DECODERS
  
  function _Json_succeed(msg)
  {
      return {
          $: 0,
          a: msg
      };
  }
  
  function _Json_fail(msg)
  {
      return {
          $: 1,
          a: msg
      };
  }
  
  function _Json_decodePrim(decoder)
  {
      return { $: 2, b: decoder };
  }
  
  var _Json_decodeInt = _Json_decodePrim(function(value) {
      return (typeof value !== 'number')
          ? _Json_expecting('an INT', value)
          :
      (-2147483647 < value && value < 2147483647 && (value | 0) === value)
          ? $elm$core$Result$Ok(value)
          :
      (isFinite(value) && !(value % 1))
          ? $elm$core$Result$Ok(value)
          : _Json_expecting('an INT', value);
  });
  
  var _Json_decodeBool = _Json_decodePrim(function(value) {
      return (typeof value === 'boolean')
          ? $elm$core$Result$Ok(value)
          : _Json_expecting('a BOOL', value);
  });
  
  var _Json_decodeFloat = _Json_decodePrim(function(value) {
      return (typeof value === 'number')
          ? $elm$core$Result$Ok(value)
          : _Json_expecting('a FLOAT', value);
  });
  
  var _Json_decodeValue = _Json_decodePrim(function(value) {
      return $elm$core$Result$Ok(_Json_wrap(value));
  });
  
  var _Json_decodeString = _Json_decodePrim(function(value) {
      return (typeof value === 'string')
          ? $elm$core$Result$Ok(value)
          : (value instanceof String)
              ? $elm$core$Result$Ok(value + '')
              : _Json_expecting('a STRING', value);
  });
  
  function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
  function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }
  
  function _Json_decodeNull(value) { return { $: 5, c: value }; }
  
  var _Json_decodeField = F2(function(field, decoder)
  {
      return {
          $: 6,
          d: field,
          b: decoder
      };
  });
  
  var _Json_decodeIndex = F2(function(index, decoder)
  {
      return {
          $: 7,
          e: index,
          b: decoder
      };
  });
  
  function _Json_decodeKeyValuePairs(decoder)
  {
      return {
          $: 8,
          b: decoder
      };
  }
  
  function _Json_mapMany(f, decoders)
  {
      return {
          $: 9,
          f: f,
          g: decoders
      };
  }
  
  var _Json_andThen = F2(function(callback, decoder)
  {
      return {
          $: 10,
          b: decoder,
          h: callback
      };
  });
  
  function _Json_oneOf(decoders)
  {
      return {
          $: 11,
          g: decoders
      };
  }
  
  
  // DECODING OBJECTS
  
  var _Json_map1 = F2(function(f, d1)
  {
      return _Json_mapMany(f, [d1]);
  });
  
  var _Json_map2 = F3(function(f, d1, d2)
  {
      return _Json_mapMany(f, [d1, d2]);
  });
  
  var _Json_map3 = F4(function(f, d1, d2, d3)
  {
      return _Json_mapMany(f, [d1, d2, d3]);
  });
  
  var _Json_map4 = F5(function(f, d1, d2, d3, d4)
  {
      return _Json_mapMany(f, [d1, d2, d3, d4]);
  });
  
  var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
  {
      return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
  });
  
  var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
  {
      return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
  });
  
  var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
  {
      return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
  });
  
  var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
  {
      return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
  });
  
  
  // DECODE
  
  var _Json_runOnString = F2(function(decoder, string)
  {
      try
      {
          var value = JSON.parse(string);
          return _Json_runHelp(decoder, value);
      }
      catch (e)
      {
          return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
      }
  });
  
  var _Json_run = F2(function(decoder, value)
  {
      return _Json_runHelp(decoder, _Json_unwrap(value));
  });
  
  function _Json_runHelp(decoder, value)
  {
      switch (decoder.$)
      {
          case 2:
              return decoder.b(value);
  
          case 5:
              return (value === null)
                  ? $elm$core$Result$Ok(decoder.c)
                  : _Json_expecting('null', value);
  
          case 3:
              if (!_Json_isArray(value))
              {
                  return _Json_expecting('a LIST', value);
              }
              return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);
  
          case 4:
              if (!_Json_isArray(value))
              {
                  return _Json_expecting('an ARRAY', value);
              }
              return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);
  
          case 6:
              var field = decoder.d;
              if (typeof value !== 'object' || value === null || !(field in value))
              {
                  return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
              }
              var result = _Json_runHelp(decoder.b, value[field]);
              return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));
  
          case 7:
              var index = decoder.e;
              if (!_Json_isArray(value))
              {
                  return _Json_expecting('an ARRAY', value);
              }
              if (index >= value.length)
              {
                  return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
              }
              var result = _Json_runHelp(decoder.b, value[index]);
              return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));
  
          case 8:
              if (typeof value !== 'object' || value === null || _Json_isArray(value))
              {
                  return _Json_expecting('an OBJECT', value);
              }
  
              var keyValuePairs = _List_Nil;
              // TODO test perf of Object.keys and switch when support is good enough
              for (var key in value)
              {
                  if (value.hasOwnProperty(key))
                  {
                      var result = _Json_runHelp(decoder.b, value[key]);
                      if (!$elm$core$Result$isOk(result))
                      {
                          return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
                      }
                      keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
                  }
              }
              return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));
  
          case 9:
              var answer = decoder.f;
              var decoders = decoder.g;
              for (var i = 0; i < decoders.length; i++)
              {
                  var result = _Json_runHelp(decoders[i], value);
                  if (!$elm$core$Result$isOk(result))
                  {
                      return result;
                  }
                  answer = answer(result.a);
              }
              return $elm$core$Result$Ok(answer);
  
          case 10:
              var result = _Json_runHelp(decoder.b, value);
              return (!$elm$core$Result$isOk(result))
                  ? result
                  : _Json_runHelp(decoder.h(result.a), value);
  
          case 11:
              var errors = _List_Nil;
              for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
              {
                  var result = _Json_runHelp(temp.a, value);
                  if ($elm$core$Result$isOk(result))
                  {
                      return result;
                  }
                  errors = _List_Cons(result.a, errors);
              }
              return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));
  
          case 1:
              return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));
  
          case 0:
              return $elm$core$Result$Ok(decoder.a);
      }
  }
  
  function _Json_runArrayDecoder(decoder, value, toElmValue)
  {
      var len = value.length;
      var array = new Array(len);
      for (var i = 0; i < len; i++)
      {
          var result = _Json_runHelp(decoder, value[i]);
          if (!$elm$core$Result$isOk(result))
          {
              return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
          }
          array[i] = result.a;
      }
      return $elm$core$Result$Ok(toElmValue(array));
  }
  
  function _Json_isArray(value)
  {
      return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
  }
  
  function _Json_toElmArray(array)
  {
      return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
  }
  
  function _Json_expecting(type, value)
  {
      return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
  }
  
  
  // EQUALITY
  
  function _Json_equality(x, y)
  {
      if (x === y)
      {
          return true;
      }
  
      if (x.$ !== y.$)
      {
          return false;
      }
  
      switch (x.$)
      {
          case 0:
          case 1:
              return x.a === y.a;
  
          case 2:
              return x.b === y.b;
  
          case 5:
              return x.c === y.c;
  
          case 3:
          case 4:
          case 8:
              return _Json_equality(x.b, y.b);
  
          case 6:
              return x.d === y.d && _Json_equality(x.b, y.b);
  
          case 7:
              return x.e === y.e && _Json_equality(x.b, y.b);
  
          case 9:
              return x.f === y.f && _Json_listEquality(x.g, y.g);
  
          case 10:
              return x.h === y.h && _Json_equality(x.b, y.b);
  
          case 11:
              return _Json_listEquality(x.g, y.g);
      }
  }
  
  function _Json_listEquality(aDecoders, bDecoders)
  {
      var len = aDecoders.length;
      if (len !== bDecoders.length)
      {
          return false;
      }
      for (var i = 0; i < len; i++)
      {
          if (!_Json_equality(aDecoders[i], bDecoders[i]))
          {
              return false;
          }
      }
      return true;
  }
  
  
  // ENCODE
  
  var _Json_encode = F2(function(indentLevel, value)
  {
      return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
  });
  
  function _Json_wrap(value) { return { $: 0, a: value }; }
  function _Json_unwrap(value) { return value.a; }
  
  function _Json_wrap_UNUSED(value) { return value; }
  function _Json_unwrap_UNUSED(value) { return value; }
  
  function _Json_emptyArray() { return []; }
  function _Json_emptyObject() { return {}; }
  
  var _Json_addField = F3(function(key, value, object)
  {
      object[key] = _Json_unwrap(value);
      return object;
  });
  
  function _Json_addEntry(func)
  {
      return F2(function(entry, array)
      {
          array.push(_Json_unwrap(func(entry)));
          return array;
      });
  }
  
  var _Json_encodeNull = _Json_wrap(null);
  
  
  
  // TASKS
  
  function _Scheduler_succeed(value)
  {
      return {
          $: 0,
          a: value
      };
  }
  
  function _Scheduler_fail(error)
  {
      return {
          $: 1,
          a: error
      };
  }
  
  function _Scheduler_binding(callback)
  {
      return {
          $: 2,
          b: callback,
          c: null
      };
  }
  
  var _Scheduler_andThen = F2(function(callback, task)
  {
      return {
          $: 3,
          b: callback,
          d: task
      };
  });
  
  var _Scheduler_onError = F2(function(callback, task)
  {
      return {
          $: 4,
          b: callback,
          d: task
      };
  });
  
  function _Scheduler_receive(callback)
  {
      return {
          $: 5,
          b: callback
      };
  }
  
  
  // PROCESSES
  
  var _Scheduler_guid = 0;
  
  function _Scheduler_rawSpawn(task)
  {
      var proc = {
          $: 0,
          e: _Scheduler_guid++,
          f: task,
          g: null,
          h: []
      };
  
      _Scheduler_enqueue(proc);
  
      return proc;
  }
  
  function _Scheduler_spawn(task)
  {
      return _Scheduler_binding(function(callback) {
          callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
      });
  }
  
  function _Scheduler_rawSend(proc, msg)
  {
      proc.h.push(msg);
      _Scheduler_enqueue(proc);
  }
  
  var _Scheduler_send = F2(function(proc, msg)
  {
      return _Scheduler_binding(function(callback) {
          _Scheduler_rawSend(proc, msg);
          callback(_Scheduler_succeed(_Utils_Tuple0));
      });
  });
  
  function _Scheduler_kill(proc)
  {
      return _Scheduler_binding(function(callback) {
          var task = proc.f;
          if (task.$ === 2 && task.c)
          {
              task.c();
          }
  
          proc.f = null;
  
          callback(_Scheduler_succeed(_Utils_Tuple0));
      });
  }
  
  
  /* STEP PROCESSES
  
  type alias Process =
    { $ : tag
    , id : unique_id
    , root : Task
    , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
    , mailbox : [msg]
    }
  
  */
  
  
  var _Scheduler_working = false;
  var _Scheduler_queue = [];
  
  
  function _Scheduler_enqueue(proc)
  {
      _Scheduler_queue.push(proc);
      if (_Scheduler_working)
      {
          return;
      }
      _Scheduler_working = true;
      while (proc = _Scheduler_queue.shift())
      {
          _Scheduler_step(proc);
      }
      _Scheduler_working = false;
  }
  
  
  function _Scheduler_step(proc)
  {
      while (proc.f)
      {
          var rootTag = proc.f.$;
          if (rootTag === 0 || rootTag === 1)
          {
              while (proc.g && proc.g.$ !== rootTag)
              {
                  proc.g = proc.g.i;
              }
              if (!proc.g)
              {
                  return;
              }
              proc.f = proc.g.b(proc.f.a);
              proc.g = proc.g.i;
          }
          else if (rootTag === 2)
          {
              proc.f.c = proc.f.b(function(newRoot) {
                  proc.f = newRoot;
                  _Scheduler_enqueue(proc);
              });
              return;
          }
          else if (rootTag === 5)
          {
              if (proc.h.length === 0)
              {
                  return;
              }
              proc.f = proc.f.b(proc.h.shift());
          }
          else // if (rootTag === 3 || rootTag === 4)
          {
              proc.g = {
                  $: rootTag === 3 ? 0 : 1,
                  b: proc.f.b,
                  i: proc.g
              };
              proc.f = proc.f.d;
          }
      }
  }
  
  
  
  function _Process_sleep(time)
  {
      return _Scheduler_binding(function(callback) {
          var id = setTimeout(function() {
              callback(_Scheduler_succeed(_Utils_Tuple0));
          }, time);
  
          return function() { clearTimeout(id); };
      });
  }
  
  
  
  
  // PROGRAMS
  
  
  var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
  {
      return _Platform_initialize(
          flagDecoder,
          args,
          impl.init,
          impl.update,
          impl.subscriptions,
          function() { return function() {} }
      );
  });
  
  
  
  // INITIALIZE A PROGRAM
  
  
  function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
  {
      var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
      $elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
      var managers = {};
      var initPair = init(result.a);
      var model = initPair.a;
      var stepper = stepperBuilder(sendToApp, model);
      var ports = _Platform_setupEffects(managers, sendToApp);
  
      function sendToApp(msg, viewMetadata)
      {
          var pair = A2(update, msg, model);
          stepper(model = pair.a, viewMetadata);
          _Platform_enqueueEffects(managers, pair.b, subscriptions(model));
      }
  
      _Platform_enqueueEffects(managers, initPair.b, subscriptions(model));
  
      return ports ? { ports: ports } : {};
  }
  
  
  
  // TRACK PRELOADS
  //
  // This is used by code in elm/browser and elm/http
  // to register any HTTP requests that are triggered by init.
  //
  
  
  var _Platform_preload;
  
  
  function _Platform_registerPreload(url)
  {
      _Platform_preload.add(url);
  }
  
  
  
  // EFFECT MANAGERS
  
  
  var _Platform_effectManagers = {};
  
  
  function _Platform_setupEffects(managers, sendToApp)
  {
      var ports;
  
      // setup all necessary effect managers
      for (var key in _Platform_effectManagers)
      {
          var manager = _Platform_effectManagers[key];
  
          if (manager.a)
          {
              ports = ports || {};
              ports[key] = manager.a(key, sendToApp);
          }
  
          managers[key] = _Platform_instantiateManager(manager, sendToApp);
      }
  
      return ports;
  }
  
  
  function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
  {
      return {
          b: init,
          c: onEffects,
          d: onSelfMsg,
          e: cmdMap,
          f: subMap
      };
  }
  
  
  function _Platform_instantiateManager(info, sendToApp)
  {
      var router = {
          g: sendToApp,
          h: undefined
      };
  
      var onEffects = info.c;
      var onSelfMsg = info.d;
      var cmdMap = info.e;
      var subMap = info.f;
  
      function loop(state)
      {
          return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
          {
              var value = msg.a;
  
              if (msg.$ === 0)
              {
                  return A3(onSelfMsg, router, value, state);
              }
  
              return cmdMap && subMap
                  ? A4(onEffects, router, value.i, value.j, state)
                  : A3(onEffects, router, cmdMap ? value.i : value.j, state);
          }));
      }
  
      return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
  }
  
  
  
  // ROUTING
  
  
  var _Platform_sendToApp = F2(function(router, msg)
  {
      return _Scheduler_binding(function(callback)
      {
          router.g(msg);
          callback(_Scheduler_succeed(_Utils_Tuple0));
      });
  });
  
  
  var _Platform_sendToSelf = F2(function(router, msg)
  {
      return A2(_Scheduler_send, router.h, {
          $: 0,
          a: msg
      });
  });
  
  
  
  // BAGS
  
  
  function _Platform_leaf(home)
  {
      return function(value)
      {
          return {
              $: 1,
              k: home,
              l: value
          };
      };
  }
  
  
  function _Platform_batch(list)
  {
      return {
          $: 2,
          m: list
      };
  }
  
  
  var _Platform_map = F2(function(tagger, bag)
  {
      return {
          $: 3,
          n: tagger,
          o: bag
      }
  });
  
  
  
  // PIPE BAGS INTO EFFECT MANAGERS
  //
  // Effects must be queued!
  //
  // Say your init contains a synchronous command, like Time.now or Time.here
  //
  //   - This will produce a batch of effects (FX_1)
  //   - The synchronous task triggers the subsequent `update` call
  //   - This will produce a batch of effects (FX_2)
  //
  // If we just start dispatching FX_2, subscriptions from FX_2 can be processed
  // before subscriptions from FX_1. No good! Earlier versions of this code had
  // this problem, leading to these reports:
  //
  //   https://github.com/elm/core/issues/980
  //   https://github.com/elm/core/pull/981
  //   https://github.com/elm/compiler/issues/1776
  //
  // The queue is necessary to avoid ordering issues for synchronous commands.
  
  
  // Why use true/false here? Why not just check the length of the queue?
  // The goal is to detect "are we currently dispatching effects?" If we
  // are, we need to bail and let the ongoing while loop handle things.
  //
  // Now say the queue has 1 element. When we dequeue the final element,
  // the queue will be empty, but we are still actively dispatching effects.
  // So you could get queue jumping in a really tricky category of cases.
  //
  var _Platform_effectsQueue = [];
  var _Platform_effectsActive = false;
  
  
  function _Platform_enqueueEffects(managers, cmdBag, subBag)
  {
      _Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });
  
      if (_Platform_effectsActive) return;
  
      _Platform_effectsActive = true;
      for (var fx; fx = _Platform_effectsQueue.shift(); )
      {
          _Platform_dispatchEffects(fx.p, fx.q, fx.r);
      }
      _Platform_effectsActive = false;
  }
  
  
  function _Platform_dispatchEffects(managers, cmdBag, subBag)
  {
      var effectsDict = {};
      _Platform_gatherEffects(true, cmdBag, effectsDict, null);
      _Platform_gatherEffects(false, subBag, effectsDict, null);
  
      for (var home in managers)
      {
          _Scheduler_rawSend(managers[home], {
              $: 'fx',
              a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
          });
      }
  }
  
  
  function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
  {
      switch (bag.$)
      {
          case 1:
              var home = bag.k;
              var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
              effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
              return;
  
          case 2:
              for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
              {
                  _Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
              }
              return;
  
          case 3:
              _Platform_gatherEffects(isCmd, bag.o, effectsDict, {
                  s: bag.n,
                  t: taggers
              });
              return;
      }
  }
  
  
  function _Platform_toEffect(isCmd, home, taggers, value)
  {
      function applyTaggers(x)
      {
          for (var temp = taggers; temp; temp = temp.t)
          {
              x = temp.s(x);
          }
          return x;
      }
  
      var map = isCmd
          ? _Platform_effectManagers[home].e
          : _Platform_effectManagers[home].f;
  
      return A2(map, applyTaggers, value)
  }
  
  
  function _Platform_insert(isCmd, newEffect, effects)
  {
      effects = effects || { i: _List_Nil, j: _List_Nil };
  
      isCmd
          ? (effects.i = _List_Cons(newEffect, effects.i))
          : (effects.j = _List_Cons(newEffect, effects.j));
  
      return effects;
  }
  
  
  
  // PORTS
  
  
  function _Platform_checkPortName(name)
  {
      if (_Platform_effectManagers[name])
      {
          _Debug_crash(3, name)
      }
  }
  
  
  
  // OUTGOING PORTS
  
  
  function _Platform_outgoingPort(name, converter)
  {
      _Platform_checkPortName(name);
      _Platform_effectManagers[name] = {
          e: _Platform_outgoingPortMap,
          u: converter,
          a: _Platform_setupOutgoingPort
      };
      return _Platform_leaf(name);
  }
  
  
  var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });
  
  
  function _Platform_setupOutgoingPort(name)
  {
      var subs = [];
      var converter = _Platform_effectManagers[name].u;
  
      // CREATE MANAGER
  
      var init = _Process_sleep(0);
  
      _Platform_effectManagers[name].b = init;
      _Platform_effectManagers[name].c = F3(function(router, cmdList, state)
      {
          for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
          {
              // grab a separate reference to subs in case unsubscribe is called
              var currentSubs = subs;
              var value = _Json_unwrap(converter(cmdList.a));
              for (var i = 0; i < currentSubs.length; i++)
              {
                  currentSubs[i](value);
              }
          }
          return init;
      });
  
      // PUBLIC API
  
      function subscribe(callback)
      {
          subs.push(callback);
      }
  
      function unsubscribe(callback)
      {
          // copy subs into a new array in case unsubscribe is called within a
          // subscribed callback
          subs = subs.slice();
          var index = subs.indexOf(callback);
          if (index >= 0)
          {
              subs.splice(index, 1);
          }
      }
  
      return {
          subscribe: subscribe,
          unsubscribe: unsubscribe
      };
  }
  
  
  
  // INCOMING PORTS
  
  
  function _Platform_incomingPort(name, converter)
  {
      _Platform_checkPortName(name);
      _Platform_effectManagers[name] = {
          f: _Platform_incomingPortMap,
          u: converter,
          a: _Platform_setupIncomingPort
      };
      return _Platform_leaf(name);
  }
  
  
  var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
  {
      return function(value)
      {
          return tagger(finalTagger(value));
      };
  });
  
  
  function _Platform_setupIncomingPort(name, sendToApp)
  {
      var subs = _List_Nil;
      var converter = _Platform_effectManagers[name].u;
  
      // CREATE MANAGER
  
      var init = _Scheduler_succeed(null);
  
      _Platform_effectManagers[name].b = init;
      _Platform_effectManagers[name].c = F3(function(router, subList, state)
      {
          subs = subList;
          return init;
      });
  
      // PUBLIC API
  
      function send(incomingValue)
      {
          var result = A2(_Json_run, converter, _Json_wrap(incomingValue));
  
          $elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);
  
          var value = result.a;
          for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
          {
              sendToApp(temp.a(value));
          }
      }
  
      return { send: send };
  }
  
  
  
  // EXPORT ELM MODULES
  //
  // Have DEBUG and PROD versions so that we can (1) give nicer errors in
  // debug mode and (2) not pay for the bits needed for that in prod mode.
  //
  
  
  /*
  function _Platform_export_UNUSED(exports)
  {
      scope['Elm']
          ? _Platform_mergeExportsProd(scope['Elm'], exports)
          : scope['Elm'] = exports;
  }
  
  */
  
  /*
  function _Platform_mergeExportsProd(obj, exports)
  {
      for (var name in exports)
      {
          (name in obj)
              ? (name == 'init')
                  ? _Debug_crash(6)
                  : _Platform_mergeExportsProd(obj[name], exports[name])
              : (obj[name] = exports[name]);
      }
  }
  */
  
  
  /*
  function _Platform_export(exports)
  {
      scope['Elm']
          ? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
          : scope['Elm'] = exports;
  }
  
  */
  
  /*
  function _Platform_mergeExportsDebug(moduleName, obj, exports)
  {
      for (var name in exports)
      {
          (name in obj)
              ? (name == 'init')
                  ? _Debug_crash(6, moduleName)
                  : _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
              : (obj[name] = exports[name]);
      }
  }
  */
  
  
  
  
  // HELPERS
  
  
  var _VirtualDom_divertHrefToApp;
  
  var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};
  
  
  function _VirtualDom_appendChild(parent, child)
  {
      parent.appendChild(child);
  }
  
  var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
  {
      // NOTE: this function needs _Platform_export available to work
  
      /**_UNUSED/
      var node = args['node'];
      //*/
      /**/
      var node = args && args['node'] ? args['node'] : _Debug_crash(0);
      //*/
  
      node.parentNode.replaceChild(
          _VirtualDom_render(virtualNode, function() {}),
          node
      );
  
      return {};
  });
  
  
  
  // TEXT
  
  
  function _VirtualDom_text(string)
  {
      return {
          $: 0,
          a: string
      };
  }
  
  
  
  // NODE
  
  
  var _VirtualDom_nodeNS = F2(function(namespace, tag)
  {
      return F2(function(factList, kidList)
      {
          for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
          {
              var kid = kidList.a;
              descendantsCount += (kid.b || 0);
              kids.push(kid);
          }
          descendantsCount += kids.length;
  
          return {
              $: 1,
              c: tag,
              d: _VirtualDom_organizeFacts(factList),
              e: kids,
              f: namespace,
              b: descendantsCount
          };
      });
  });
  
  
  var _VirtualDom_node = _VirtualDom_nodeNS(undefined);
  
  
  
  // KEYED NODE
  
  
  var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
  {
      return F2(function(factList, kidList)
      {
          for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
          {
              var kid = kidList.a;
              descendantsCount += (kid.b.b || 0);
              kids.push(kid);
          }
          descendantsCount += kids.length;
  
          return {
              $: 2,
              c: tag,
              d: _VirtualDom_organizeFacts(factList),
              e: kids,
              f: namespace,
              b: descendantsCount
          };
      });
  });
  
  
  var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);
  
  
  
  // CUSTOM
  
  
  function _VirtualDom_custom(factList, model, render, diff)
  {
      return {
          $: 3,
          d: _VirtualDom_organizeFacts(factList),
          g: model,
          h: render,
          i: diff
      };
  }
  
  
  
  // MAP
  
  
  var _VirtualDom_map = F2(function(tagger, node)
  {
      return {
          $: 4,
          j: tagger,
          k: node,
          b: 1 + (node.b || 0)
      };
  });
  
  
  
  // LAZY
  
  
  function _VirtualDom_thunk(refs, thunk)
  {
      return {
          $: 5,
          l: refs,
          m: thunk,
          k: undefined
      };
  }
  
  var _VirtualDom_lazy = F2(function(func, a)
  {
      return _VirtualDom_thunk([func, a], function() {
          return func(a);
      });
  });
  
  var _VirtualDom_lazy2 = F3(function(func, a, b)
  {
      return _VirtualDom_thunk([func, a, b], function() {
          return A2(func, a, b);
      });
  });
  
  var _VirtualDom_lazy3 = F4(function(func, a, b, c)
  {
      return _VirtualDom_thunk([func, a, b, c], function() {
          return A3(func, a, b, c);
      });
  });
  
  var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
  {
      return _VirtualDom_thunk([func, a, b, c, d], function() {
          return A4(func, a, b, c, d);
      });
  });
  
  var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
  {
      return _VirtualDom_thunk([func, a, b, c, d, e], function() {
          return A5(func, a, b, c, d, e);
      });
  });
  
  var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
  {
      return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
          return A6(func, a, b, c, d, e, f);
      });
  });
  
  var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
  {
      return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
          return A7(func, a, b, c, d, e, f, g);
      });
  });
  
  var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
  {
      return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
          return A8(func, a, b, c, d, e, f, g, h);
      });
  });
  
  
  
  // FACTS
  
  
  var _VirtualDom_on = F2(function(key, handler)
  {
      return {
          $: 'a0',
          n: key,
          o: handler
      };
  });
  var _VirtualDom_style = F2(function(key, value)
  {
      return {
          $: 'a1',
          n: key,
          o: value
      };
  });
  var _VirtualDom_property = F2(function(key, value)
  {
      return {
          $: 'a2',
          n: key,
          o: value
      };
  });
  var _VirtualDom_attribute = F2(function(key, value)
  {
      return {
          $: 'a3',
          n: key,
          o: value
      };
  });
  var _VirtualDom_attributeNS = F3(function(namespace, key, value)
  {
      return {
          $: 'a4',
          n: key,
          o: { f: namespace, o: value }
      };
  });
  
  
  
  // XSS ATTACK VECTOR CHECKS
  //
  // For some reason, tabs can appear in href protocols and it still works.
  // So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
  // in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
  // so freaky.
  //
  // Pulling the regular expressions out to the top level gives a slight speed
  // boost in small benchmarks (4-10%) but hoisting values to reduce allocation
  // can be unpredictable in large programs where JIT may have a harder time with
  // functions are not fully self-contained. The benefit is more that the js and
  // js_html ones are so weird that I prefer to see them near each other.
  
  
  var _VirtualDom_RE_script = /^script$/i;
  var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
  var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
  var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;
  
  
  function _VirtualDom_noScript(tag)
  {
      return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
  }
  
  function _VirtualDom_noOnOrFormAction(key)
  {
      return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
  }
  
  function _VirtualDom_noInnerHtmlOrFormAction(key)
  {
      return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
  }
  
  function _VirtualDom_noJavaScriptUri(value)
  {
      return _VirtualDom_RE_js.test(value)
          ? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
          : value;
  }
  
  function _VirtualDom_noJavaScriptOrHtmlUri(value)
  {
      return _VirtualDom_RE_js_html.test(value)
          ? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
          : value;
  }
  
  function _VirtualDom_noJavaScriptOrHtmlJson(value)
  {
      return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
          ? _Json_wrap(
              /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
          ) : value;
  }
  
  
  
  // MAP FACTS
  
  
  var _VirtualDom_mapAttribute = F2(function(func, attr)
  {
      return (attr.$ === 'a0')
          ? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
          : attr;
  });
  
  function _VirtualDom_mapHandler(func, handler)
  {
      var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);
  
      // 0 = Normal
      // 1 = MayStopPropagation
      // 2 = MayPreventDefault
      // 3 = Custom
  
      return {
          $: handler.$,
          a:
              !tag
                  ? A2($elm$json$Json$Decode$map, func, handler.a)
                  :
              A3($elm$json$Json$Decode$map2,
                  tag < 3
                      ? _VirtualDom_mapEventTuple
                      : _VirtualDom_mapEventRecord,
                  $elm$json$Json$Decode$succeed(func),
                  handler.a
              )
      };
  }
  
  var _VirtualDom_mapEventTuple = F2(function(func, tuple)
  {
      return _Utils_Tuple2(func(tuple.a), tuple.b);
  });
  
  var _VirtualDom_mapEventRecord = F2(function(func, record)
  {
      return {
          message: func(record.message),
          stopPropagation: record.stopPropagation,
          preventDefault: record.preventDefault
      }
  });
  
  
  
  // ORGANIZE FACTS
  
  
  function _VirtualDom_organizeFacts(factList)
  {
      for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
      {
          var entry = factList.a;
  
          var tag = entry.$;
          var key = entry.n;
          var value = entry.o;
  
          if (tag === 'a2')
          {
              (key === 'className')
                  ? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
                  : facts[key] = _Json_unwrap(value);
  
              continue;
          }
  
          var subFacts = facts[tag] || (facts[tag] = {});
          (tag === 'a3' && key === 'class')
              ? _VirtualDom_addClass(subFacts, key, value)
              : subFacts[key] = value;
      }
  
      return facts;
  }
  
  function _VirtualDom_addClass(object, key, newClass)
  {
      var classes = object[key];
      object[key] = classes ? classes + ' ' + newClass : newClass;
  }
  
  
  
  // RENDER
  
  
  function _VirtualDom_render(vNode, eventNode)
  {
      var tag = vNode.$;
  
      if (tag === 5)
      {
          return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
      }
  
      if (tag === 0)
      {
          return _VirtualDom_doc.createTextNode(vNode.a);
      }
  
      if (tag === 4)
      {
          var subNode = vNode.k;
          var tagger = vNode.j;
  
          while (subNode.$ === 4)
          {
              typeof tagger !== 'object'
                  ? tagger = [tagger, subNode.j]
                  : tagger.push(subNode.j);
  
              subNode = subNode.k;
          }
  
          var subEventRoot = { j: tagger, p: eventNode };
          var domNode = _VirtualDom_render(subNode, subEventRoot);
          domNode.elm_event_node_ref = subEventRoot;
          return domNode;
      }
  
      if (tag === 3)
      {
          var domNode = vNode.h(vNode.g);
          _VirtualDom_applyFacts(domNode, eventNode, vNode.d);
          return domNode;
      }
  
      // at this point `tag` must be 1 or 2
  
      var domNode = vNode.f
          ? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
          : _VirtualDom_doc.createElement(vNode.c);
  
      if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
      {
          domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
      }
  
      _VirtualDom_applyFacts(domNode, eventNode, vNode.d);
  
      for (var kids = vNode.e, i = 0; i < kids.length; i++)
      {
          _VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
      }
  
      return domNode;
  }
  
  
  
  // APPLY FACTS
  
  
  function _VirtualDom_applyFacts(domNode, eventNode, facts)
  {
      for (var key in facts)
      {
          var value = facts[key];
  
          key === 'a1'
              ? _VirtualDom_applyStyles(domNode, value)
              :
          key === 'a0'
              ? _VirtualDom_applyEvents(domNode, eventNode, value)
              :
          key === 'a3'
              ? _VirtualDom_applyAttrs(domNode, value)
              :
          key === 'a4'
              ? _VirtualDom_applyAttrsNS(domNode, value)
              :
          ((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
      }
  }
  
  
  
  // APPLY STYLES
  
  
  function _VirtualDom_applyStyles(domNode, styles)
  {
      var domNodeStyle = domNode.style;
  
      for (var key in styles)
      {
          domNodeStyle[key] = styles[key];
      }
  }
  
  
  
  // APPLY ATTRS
  
  
  function _VirtualDom_applyAttrs(domNode, attrs)
  {
      for (var key in attrs)
      {
          var value = attrs[key];
          typeof value !== 'undefined'
              ? domNode.setAttribute(key, value)
              : domNode.removeAttribute(key);
      }
  }
  
  
  
  // APPLY NAMESPACED ATTRS
  
  
  function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
  {
      for (var key in nsAttrs)
      {
          var pair = nsAttrs[key];
          var namespace = pair.f;
          var value = pair.o;
  
          typeof value !== 'undefined'
              ? domNode.setAttributeNS(namespace, key, value)
              : domNode.removeAttributeNS(namespace, key);
      }
  }
  
  
  
  // APPLY EVENTS
  
  
  function _VirtualDom_applyEvents(domNode, eventNode, events)
  {
      var allCallbacks = domNode.elmFs || (domNode.elmFs = {});
  
      for (var key in events)
      {
          var newHandler = events[key];
          var oldCallback = allCallbacks[key];
  
          if (!newHandler)
          {
              domNode.removeEventListener(key, oldCallback);
              allCallbacks[key] = undefined;
              continue;
          }
  
          if (oldCallback)
          {
              var oldHandler = oldCallback.q;
              if (oldHandler.$ === newHandler.$)
              {
                  oldCallback.q = newHandler;
                  continue;
              }
              domNode.removeEventListener(key, oldCallback);
          }
  
          oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
          domNode.addEventListener(key, oldCallback,
              _VirtualDom_passiveSupported
              && { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
          );
          allCallbacks[key] = oldCallback;
      }
  }
  
  
  
  // PASSIVE EVENTS
  
  
  var _VirtualDom_passiveSupported;
  
  try
  {
      window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
          get: function() { _VirtualDom_passiveSupported = true; }
      }));
  }
  catch(e) {}
  
  
  
  // EVENT HANDLERS
  
  
  function _VirtualDom_makeCallback(eventNode, initialHandler)
  {
      function callback(event)
      {
          var handler = callback.q;
          var result = _Json_runHelp(handler.a, event);
  
          if (!$elm$core$Result$isOk(result))
          {
              return;
          }
  
          var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);
  
          // 0 = Normal
          // 1 = MayStopPropagation
          // 2 = MayPreventDefault
          // 3 = Custom
  
          var value = result.a;
          var message = !tag ? value : tag < 3 ? value.a : value.message;
          var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
          var currentEventNode = (
              stopPropagation && event.stopPropagation(),
              (tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
              eventNode
          );
          var tagger;
          var i;
          while (tagger = currentEventNode.j)
          {
              if (typeof tagger == 'function')
              {
                  message = tagger(message);
              }
              else
              {
                  for (var i = tagger.length; i--; )
                  {
                      message = tagger[i](message);
                  }
              }
              currentEventNode = currentEventNode.p;
          }
          currentEventNode(message, stopPropagation); // stopPropagation implies isSync
      }
  
      callback.q = initialHandler;
  
      return callback;
  }
  
  function _VirtualDom_equalEvents(x, y)
  {
      return x.$ == y.$ && _Json_equality(x.a, y.a);
  }
  
  
  
  // DIFF
  
  
  // TODO: Should we do patches like in iOS?
  //
  // type Patch
  //   = At Int Patch
  //   | Batch (List Patch)
  //   | Change ...
  //
  // How could it not be better?
  //
  function _VirtualDom_diff(x, y)
  {
      var patches = [];
      _VirtualDom_diffHelp(x, y, patches, 0);
      return patches;
  }
  
  
  function _VirtualDom_pushPatch(patches, type, index, data)
  {
      var patch = {
          $: type,
          r: index,
          s: data,
          t: undefined,
          u: undefined
      };
      patches.push(patch);
      return patch;
  }
  
  
  function _VirtualDom_diffHelp(x, y, patches, index)
  {
      if (x === y)
      {
          return;
      }
  
      var xType = x.$;
      var yType = y.$;
  
      // Bail if you run into different types of nodes. Implies that the
      // structure has changed significantly and it's not worth a diff.
      if (xType !== yType)
      {
          if (xType === 1 && yType === 2)
          {
              y = _VirtualDom_dekey(y);
              yType = 1;
          }
          else
          {
              _VirtualDom_pushPatch(patches, 0, index, y);
              return;
          }
      }
  
      // Now we know that both nodes are the same $.
      switch (yType)
      {
          case 5:
              var xRefs = x.l;
              var yRefs = y.l;
              var i = xRefs.length;
              var same = i === yRefs.length;
              while (same && i--)
              {
                  same = xRefs[i] === yRefs[i];
              }
              if (same)
              {
                  y.k = x.k;
                  return;
              }
              y.k = y.m();
              var subPatches = [];
              _VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
              subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
              return;
  
          case 4:
              // gather nested taggers
              var xTaggers = x.j;
              var yTaggers = y.j;
              var nesting = false;
  
              var xSubNode = x.k;
              while (xSubNode.$ === 4)
              {
                  nesting = true;
  
                  typeof xTaggers !== 'object'
                      ? xTaggers = [xTaggers, xSubNode.j]
                      : xTaggers.push(xSubNode.j);
  
                  xSubNode = xSubNode.k;
              }
  
              var ySubNode = y.k;
              while (ySubNode.$ === 4)
              {
                  nesting = true;
  
                  typeof yTaggers !== 'object'
                      ? yTaggers = [yTaggers, ySubNode.j]
                      : yTaggers.push(ySubNode.j);
  
                  ySubNode = ySubNode.k;
              }
  
              // Just bail if different numbers of taggers. This implies the
              // structure of the virtual DOM has changed.
              if (nesting && xTaggers.length !== yTaggers.length)
              {
                  _VirtualDom_pushPatch(patches, 0, index, y);
                  return;
              }
  
              // check if taggers are "the same"
              if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
              {
                  _VirtualDom_pushPatch(patches, 2, index, yTaggers);
              }
  
              // diff everything below the taggers
              _VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
              return;
  
          case 0:
              if (x.a !== y.a)
              {
                  _VirtualDom_pushPatch(patches, 3, index, y.a);
              }
              return;
  
          case 1:
              _VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
              return;
  
          case 2:
              _VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
              return;
  
          case 3:
              if (x.h !== y.h)
              {
                  _VirtualDom_pushPatch(patches, 0, index, y);
                  return;
              }
  
              var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
              factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);
  
              var patch = y.i(x.g, y.g);
              patch && _VirtualDom_pushPatch(patches, 5, index, patch);
  
              return;
      }
  }
  
  // assumes the incoming arrays are the same length
  function _VirtualDom_pairwiseRefEqual(as, bs)
  {
      for (var i = 0; i < as.length; i++)
      {
          if (as[i] !== bs[i])
          {
              return false;
          }
      }
  
      return true;
  }
  
  function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
  {
      // Bail if obvious indicators have changed. Implies more serious
      // structural changes such that it's not worth it to diff.
      if (x.c !== y.c || x.f !== y.f)
      {
          _VirtualDom_pushPatch(patches, 0, index, y);
          return;
      }
  
      var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
      factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);
  
      diffKids(x, y, patches, index);
  }
  
  
  
  // DIFF FACTS
  
  
  // TODO Instead of creating a new diff object, it's possible to just test if
  // there *is* a diff. During the actual patch, do the diff again and make the
  // modifications directly. This way, there's no new allocations. Worth it?
  function _VirtualDom_diffFacts(x, y, category)
  {
      var diff;
  
      // look for changes and removals
      for (var xKey in x)
      {
          if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
          {
              var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
              if (subDiff)
              {
                  diff = diff || {};
                  diff[xKey] = subDiff;
              }
              continue;
          }
  
          // remove if not in the new facts
          if (!(xKey in y))
          {
              diff = diff || {};
              diff[xKey] =
                  !category
                      ? (typeof x[xKey] === 'string' ? '' : null)
                      :
                  (category === 'a1')
                      ? ''
                      :
                  (category === 'a0' || category === 'a3')
                      ? undefined
                      :
                  { f: x[xKey].f, o: undefined };
  
              continue;
          }
  
          var xValue = x[xKey];
          var yValue = y[xKey];
  
          // reference equal, so don't worry about it
          if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
              || category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
          {
              continue;
          }
  
          diff = diff || {};
          diff[xKey] = yValue;
      }
  
      // add new stuff
      for (var yKey in y)
      {
          if (!(yKey in x))
          {
              diff = diff || {};
              diff[yKey] = y[yKey];
          }
      }
  
      return diff;
  }
  
  
  
  // DIFF KIDS
  
  
  function _VirtualDom_diffKids(xParent, yParent, patches, index)
  {
      var xKids = xParent.e;
      var yKids = yParent.e;
  
      var xLen = xKids.length;
      var yLen = yKids.length;
  
      // FIGURE OUT IF THERE ARE INSERTS OR REMOVALS
  
      if (xLen > yLen)
      {
          _VirtualDom_pushPatch(patches, 6, index, {
              v: yLen,
              i: xLen - yLen
          });
      }
      else if (xLen < yLen)
      {
          _VirtualDom_pushPatch(patches, 7, index, {
              v: xLen,
              e: yKids
          });
      }
  
      // PAIRWISE DIFF EVERYTHING ELSE
  
      for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
      {
          var xKid = xKids[i];
          _VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
          index += xKid.b || 0;
      }
  }
  
  
  
  // KEYED DIFF
  
  
  function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
  {
      var localPatches = [];
  
      var changes = {}; // Dict String Entry
      var inserts = []; // Array { index : Int, entry : Entry }
      // type Entry = { tag : String, vnode : VNode, index : Int, data : _ }
  
      var xKids = xParent.e;
      var yKids = yParent.e;
      var xLen = xKids.length;
      var yLen = yKids.length;
      var xIndex = 0;
      var yIndex = 0;
  
      var index = rootIndex;
  
      while (xIndex < xLen && yIndex < yLen)
      {
          var x = xKids[xIndex];
          var y = yKids[yIndex];
  
          var xKey = x.a;
          var yKey = y.a;
          var xNode = x.b;
          var yNode = y.b;
  
          var newMatch = undefined;
          var oldMatch = undefined;
  
          // check if keys match
  
          if (xKey === yKey)
          {
              index++;
              _VirtualDom_diffHelp(xNode, yNode, localPatches, index);
              index += xNode.b || 0;
  
              xIndex++;
              yIndex++;
              continue;
          }
  
          // look ahead 1 to detect insertions and removals.
  
          var xNext = xKids[xIndex + 1];
          var yNext = yKids[yIndex + 1];
  
          if (xNext)
          {
              var xNextKey = xNext.a;
              var xNextNode = xNext.b;
              oldMatch = yKey === xNextKey;
          }
  
          if (yNext)
          {
              var yNextKey = yNext.a;
              var yNextNode = yNext.b;
              newMatch = xKey === yNextKey;
          }
  
  
          // swap x and y
          if (newMatch && oldMatch)
          {
              index++;
              _VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
              _VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
              index += xNode.b || 0;
  
              index++;
              _VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
              index += xNextNode.b || 0;
  
              xIndex += 2;
              yIndex += 2;
              continue;
          }
  
          // insert y
          if (newMatch)
          {
              index++;
              _VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
              _VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
              index += xNode.b || 0;
  
              xIndex += 1;
              yIndex += 2;
              continue;
          }
  
          // remove x
          if (oldMatch)
          {
              index++;
              _VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
              index += xNode.b || 0;
  
              index++;
              _VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
              index += xNextNode.b || 0;
  
              xIndex += 2;
              yIndex += 1;
              continue;
          }
  
          // remove x, insert y
          if (xNext && xNextKey === yNextKey)
          {
              index++;
              _VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
              _VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
              index += xNode.b || 0;
  
              index++;
              _VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
              index += xNextNode.b || 0;
  
              xIndex += 2;
              yIndex += 2;
              continue;
          }
  
          break;
      }
  
      // eat up any remaining nodes with removeNode and insertNode
  
      while (xIndex < xLen)
      {
          index++;
          var x = xKids[xIndex];
          var xNode = x.b;
          _VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
          index += xNode.b || 0;
          xIndex++;
      }
  
      while (yIndex < yLen)
      {
          var endInserts = endInserts || [];
          var y = yKids[yIndex];
          _VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
          yIndex++;
      }
  
      if (localPatches.length > 0 || inserts.length > 0 || endInserts)
      {
          _VirtualDom_pushPatch(patches, 8, rootIndex, {
              w: localPatches,
              x: inserts,
              y: endInserts
          });
      }
  }
  
  
  
  // CHANGES FROM KEYED DIFF
  
  
  var _VirtualDom_POSTFIX = '_elmW6BL';
  
  
  function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
  {
      var entry = changes[key];
  
      // never seen this key before
      if (!entry)
      {
          entry = {
              c: 0,
              z: vnode,
              r: yIndex,
              s: undefined
          };
  
          inserts.push({ r: yIndex, A: entry });
          changes[key] = entry;
  
          return;
      }
  
      // this key was removed earlier, a match!
      if (entry.c === 1)
      {
          inserts.push({ r: yIndex, A: entry });
  
          entry.c = 2;
          var subPatches = [];
          _VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
          entry.r = yIndex;
          entry.s.s = {
              w: subPatches,
              A: entry
          };
  
          return;
      }
  
      // this key has already been inserted or moved, a duplicate!
      _VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
  }
  
  
  function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
  {
      var entry = changes[key];
  
      // never seen this key before
      if (!entry)
      {
          var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);
  
          changes[key] = {
              c: 1,
              z: vnode,
              r: index,
              s: patch
          };
  
          return;
      }
  
      // this key was inserted earlier, a match!
      if (entry.c === 0)
      {
          entry.c = 2;
          var subPatches = [];
          _VirtualDom_diffHelp(vnode, entry.z, subPatches, index);
  
          _VirtualDom_pushPatch(localPatches, 9, index, {
              w: subPatches,
              A: entry
          });
  
          return;
      }
  
      // this key has already been removed or moved, a duplicate!
      _VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
  }
  
  
  
  // ADD DOM NODES
  //
  // Each DOM node has an "index" assigned in order of traversal. It is important
  // to minimize our crawl over the actual DOM, so these indexes (along with the
  // descendantsCount of virtual nodes) let us skip touching entire subtrees of
  // the DOM if we know there are no patches there.
  
  
  function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
  {
      _VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
  }
  
  
  // assumes `patches` is non-empty and indexes increase monotonically.
  function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
  {
      var patch = patches[i];
      var index = patch.r;
  
      while (index === low)
      {
          var patchType = patch.$;
  
          if (patchType === 1)
          {
              _VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
          }
          else if (patchType === 8)
          {
              patch.t = domNode;
              patch.u = eventNode;
  
              var subPatches = patch.s.w;
              if (subPatches.length > 0)
              {
                  _VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
              }
          }
          else if (patchType === 9)
          {
              patch.t = domNode;
              patch.u = eventNode;
  
              var data = patch.s;
              if (data)
              {
                  data.A.s = domNode;
                  var subPatches = data.w;
                  if (subPatches.length > 0)
                  {
                      _VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
                  }
              }
          }
          else
          {
              patch.t = domNode;
              patch.u = eventNode;
          }
  
          i++;
  
          if (!(patch = patches[i]) || (index = patch.r) > high)
          {
              return i;
          }
      }
  
      var tag = vNode.$;
  
      if (tag === 4)
      {
          var subNode = vNode.k;
  
          while (subNode.$ === 4)
          {
              subNode = subNode.k;
          }
  
          return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
      }
  
      // tag must be 1 or 2 at this point
  
      var vKids = vNode.e;
      var childNodes = domNode.childNodes;
      for (var j = 0; j < vKids.length; j++)
      {
          low++;
          var vKid = tag === 1 ? vKids[j] : vKids[j].b;
          var nextLow = low + (vKid.b || 0);
          if (low <= index && index <= nextLow)
          {
              i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
              if (!(patch = patches[i]) || (index = patch.r) > high)
              {
                  return i;
              }
          }
          low = nextLow;
      }
      return i;
  }
  
  
  
  // APPLY PATCHES
  
  
  function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
  {
      if (patches.length === 0)
      {
          return rootDomNode;
      }
  
      _VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
      return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
  }
  
  function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
  {
      for (var i = 0; i < patches.length; i++)
      {
          var patch = patches[i];
          var localDomNode = patch.t
          var newNode = _VirtualDom_applyPatch(localDomNode, patch);
          if (localDomNode === rootDomNode)
          {
              rootDomNode = newNode;
          }
      }
      return rootDomNode;
  }
  
  function _VirtualDom_applyPatch(domNode, patch)
  {
      switch (patch.$)
      {
          case 0:
              return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);
  
          case 4:
              _VirtualDom_applyFacts(domNode, patch.u, patch.s);
              return domNode;
  
          case 3:
              domNode.replaceData(0, domNode.length, patch.s);
              return domNode;
  
          case 1:
              return _VirtualDom_applyPatchesHelp(domNode, patch.s);
  
          case 2:
              if (domNode.elm_event_node_ref)
              {
                  domNode.elm_event_node_ref.j = patch.s;
              }
              else
              {
                  domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
              }
              return domNode;
  
          case 6:
              var data = patch.s;
              for (var i = 0; i < data.i; i++)
              {
                  domNode.removeChild(domNode.childNodes[data.v]);
              }
              return domNode;
  
          case 7:
              var data = patch.s;
              var kids = data.e;
              var i = data.v;
              var theEnd = domNode.childNodes[i];
              for (; i < kids.length; i++)
              {
                  domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
              }
              return domNode;
  
          case 9:
              var data = patch.s;
              if (!data)
              {
                  domNode.parentNode.removeChild(domNode);
                  return domNode;
              }
              var entry = data.A;
              if (typeof entry.r !== 'undefined')
              {
                  domNode.parentNode.removeChild(domNode);
              }
              entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
              return domNode;
  
          case 8:
              return _VirtualDom_applyPatchReorder(domNode, patch);
  
          case 5:
              return patch.s(domNode);
  
          default:
              _Debug_crash(10); // 'Ran into an unknown patch!'
      }
  }
  
  
  function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
  {
      var parentNode = domNode.parentNode;
      var newNode = _VirtualDom_render(vNode, eventNode);
  
      if (!newNode.elm_event_node_ref)
      {
          newNode.elm_event_node_ref = domNode.elm_event_node_ref;
      }
  
      if (parentNode && newNode !== domNode)
      {
          parentNode.replaceChild(newNode, domNode);
      }
      return newNode;
  }
  
  
  function _VirtualDom_applyPatchReorder(domNode, patch)
  {
      var data = patch.s;
  
      // remove end inserts
      var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);
  
      // removals
      domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);
  
      // inserts
      var inserts = data.x;
      for (var i = 0; i < inserts.length; i++)
      {
          var insert = inserts[i];
          var entry = insert.A;
          var node = entry.c === 2
              ? entry.s
              : _VirtualDom_render(entry.z, patch.u);
          domNode.insertBefore(node, domNode.childNodes[insert.r]);
      }
  
      // add end inserts
      if (frag)
      {
          _VirtualDom_appendChild(domNode, frag);
      }
  
      return domNode;
  }
  
  
  function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
  {
      if (!endInserts)
      {
          return;
      }
  
      var frag = _VirtualDom_doc.createDocumentFragment();
      for (var i = 0; i < endInserts.length; i++)
      {
          var insert = endInserts[i];
          var entry = insert.A;
          _VirtualDom_appendChild(frag, entry.c === 2
              ? entry.s
              : _VirtualDom_render(entry.z, patch.u)
          );
      }
      return frag;
  }
  
  
  function _VirtualDom_virtualize(node)
  {
      // TEXT NODES
  
      if (node.nodeType === 3)
      {
          return _VirtualDom_text(node.textContent);
      }
  
  
      // WEIRD NODES
  
      if (node.nodeType !== 1)
      {
          return _VirtualDom_text('');
      }
  
  
      // ELEMENT NODES
  
      var attrList = _List_Nil;
      var attrs = node.attributes;
      for (var i = attrs.length; i--; )
      {
          var attr = attrs[i];
          var name = attr.name;
          var value = attr.value;
          attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
      }
  
      var tag = node.tagName.toLowerCase();
      var kidList = _List_Nil;
      var kids = node.childNodes;
  
      for (var i = kids.length; i--; )
      {
          kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
      }
      return A3(_VirtualDom_node, tag, attrList, kidList);
  }
  
  function _VirtualDom_dekey(keyedNode)
  {
      var keyedKids = keyedNode.e;
      var len = keyedKids.length;
      var kids = new Array(len);
      for (var i = 0; i < len; i++)
      {
          kids[i] = keyedKids[i].b;
      }
  
      return {
          $: 1,
          c: keyedNode.c,
          d: keyedNode.d,
          e: kids,
          f: keyedNode.f,
          b: keyedNode.b
      };
  }
  
  
  
  
  // ELEMENT
  
  
  var _Debugger_element;
  
  var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
  {
      return _Platform_initialize(
          flagDecoder,
          args,
          impl.init,
          impl.update,
          impl.subscriptions,
          function(sendToApp, initialModel) {
              var view = impl.view;
              /**_UNUSED/
              var domNode = args['node'];
              //*/
              /**/
              var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
              //*/
              var currNode = _VirtualDom_virtualize(domNode);
  
              return _Browser_makeAnimator(initialModel, function(model)
              {
                  var nextNode = view(model);
                  var patches = _VirtualDom_diff(currNode, nextNode);
                  domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
                  currNode = nextNode;
              });
          }
      );
  });
  
  
  
  // DOCUMENT
  
  
  var _Debugger_document;
  
  var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
  {
      return _Platform_initialize(
          flagDecoder,
          args,
          impl.init,
          impl.update,
          impl.subscriptions,
          function(sendToApp, initialModel) {
              var divertHrefToApp = impl.setup && impl.setup(sendToApp)
              var view = impl.view;
              var title = _VirtualDom_doc.title;
              var bodyNode = _VirtualDom_doc.body;
              var currNode = _VirtualDom_virtualize(bodyNode);
              return _Browser_makeAnimator(initialModel, function(model)
              {
                  _VirtualDom_divertHrefToApp = divertHrefToApp;
                  var doc = view(model);
                  var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
                  var patches = _VirtualDom_diff(currNode, nextNode);
                  bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
                  currNode = nextNode;
                  _VirtualDom_divertHrefToApp = 0;
                  (title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
              });
          }
      );
  });
  
  
  
  // ANIMATION
  
  
  var _Browser_cancelAnimationFrame =
      typeof cancelAnimationFrame !== 'undefined'
          ? cancelAnimationFrame
          : function(id) { clearTimeout(id); };
  
  var _Browser_requestAnimationFrame =
      typeof requestAnimationFrame !== 'undefined'
          ? requestAnimationFrame
          : function(callback) { return setTimeout(callback, 1000 / 60); };
  
  
  function _Browser_makeAnimator(model, draw)
  {
      draw(model);
  
      var state = 0;
  
      function updateIfNeeded()
      {
          state = state === 1
              ? 0
              : ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
      }
  
      return function(nextModel, isSync)
      {
          model = nextModel;
  
          isSync
              ? ( draw(model),
                  state === 2 && (state = 1)
                  )
              : ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
                  state = 2
                  );
      };
  }
  
  
  
  // APPLICATION
  
  
  function _Browser_application(impl)
  {
      var onUrlChange = impl.onUrlChange;
      var onUrlRequest = impl.onUrlRequest;
      var key = function() { key.a(onUrlChange(_Browser_getUrl())); };
  
      return _Browser_document({
          setup: function(sendToApp)
          {
              key.a = sendToApp;
              _Browser_window.addEventListener('popstate', key);
              _Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);
  
              return F2(function(domNode, event)
              {
                  if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
                  {
                      event.preventDefault();
                      var href = domNode.href;
                      var curr = _Browser_getUrl();
                      var next = $elm$url$Url$fromString(href).a;
                      sendToApp(onUrlRequest(
                          (next
                              && curr.protocol === next.protocol
                              && curr.host === next.host
                              && curr.port_.a === next.port_.a
                          )
                              ? $elm$browser$Browser$Internal(next)
                              : $elm$browser$Browser$External(href)
                      ));
                  }
              });
          },
          init: function(flags)
          {
              return A3(impl.init, flags, _Browser_getUrl(), key);
          },
          view: impl.view,
          update: impl.update,
          subscriptions: impl.subscriptions
      });
  }
  
  function _Browser_getUrl()
  {
      return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
  }
  
  var _Browser_go = F2(function(key, n)
  {
      return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
          n && history.go(n);
          key();
      }));
  });
  
  var _Browser_pushUrl = F2(function(key, url)
  {
      return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
          history.pushState({}, '', url);
          key();
      }));
  });
  
  var _Browser_replaceUrl = F2(function(key, url)
  {
      return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
          history.replaceState({}, '', url);
          key();
      }));
  });
  
  
  
  // GLOBAL EVENTS
  
  
  var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
  var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
  var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;
  
  var _Browser_on = F3(function(node, eventName, sendToSelf)
  {
      return _Scheduler_spawn(_Scheduler_binding(function(callback)
      {
          function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
          node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
          return function() { node.removeEventListener(eventName, handler); };
      }));
  });
  
  var _Browser_decodeEvent = F2(function(decoder, event)
  {
      var result = _Json_runHelp(decoder, event);
      return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
  });
  
  
  
  // PAGE VISIBILITY
  
  
  function _Browser_visibilityInfo()
  {
      return (typeof _VirtualDom_doc.hidden !== 'undefined')
          ? { hidden: 'hidden', change: 'visibilitychange' }
          :
      (typeof _VirtualDom_doc.mozHidden !== 'undefined')
          ? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
          :
      (typeof _VirtualDom_doc.msHidden !== 'undefined')
          ? { hidden: 'msHidden', change: 'msvisibilitychange' }
          :
      (typeof _VirtualDom_doc.webkitHidden !== 'undefined')
          ? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
          : { hidden: 'hidden', change: 'visibilitychange' };
  }
  
  
  
  // ANIMATION FRAMES
  
  
  function _Browser_rAF()
  {
      return _Scheduler_binding(function(callback)
      {
          var id = _Browser_requestAnimationFrame(function() {
              callback(_Scheduler_succeed(Date.now()));
          });
  
          return function() {
              _Browser_cancelAnimationFrame(id);
          };
      });
  }
  
  
  function _Browser_now()
  {
      return _Scheduler_binding(function(callback)
      {
          callback(_Scheduler_succeed(Date.now()));
      });
  }
  
  
  
  // DOM STUFF
  
  
  function _Browser_withNode(id, doStuff)
  {
      return _Scheduler_binding(function(callback)
      {
          _Browser_requestAnimationFrame(function() {
              var node = document.getElementById(id);
              callback(node
                  ? _Scheduler_succeed(doStuff(node))
                  : _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
              );
          });
      });
  }
  
  
  function _Browser_withWindow(doStuff)
  {
      return _Scheduler_binding(function(callback)
      {
          _Browser_requestAnimationFrame(function() {
              callback(_Scheduler_succeed(doStuff()));
          });
      });
  }
  
  
  // FOCUS and BLUR
  
  
  var _Browser_call = F2(function(functionName, id)
  {
      return _Browser_withNode(id, function(node) {
          node[functionName]();
          return _Utils_Tuple0;
      });
  });
  
  
  
  // WINDOW VIEWPORT
  
  
  function _Browser_getViewport()
  {
      return {
          scene: _Browser_getScene(),
          viewport: {
              x: _Browser_window.pageXOffset,
              y: _Browser_window.pageYOffset,
              width: _Browser_doc.documentElement.clientWidth,
              height: _Browser_doc.documentElement.clientHeight
          }
      };
  }
  
  function _Browser_getScene()
  {
      var body = _Browser_doc.body;
      var elem = _Browser_doc.documentElement;
      return {
          width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
          height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
      };
  }
  
  var _Browser_setViewport = F2(function(x, y)
  {
      return _Browser_withWindow(function()
      {
          _Browser_window.scroll(x, y);
          return _Utils_Tuple0;
      });
  });
  
  
  
  // ELEMENT VIEWPORT
  
  
  function _Browser_getViewportOf(id)
  {
      return _Browser_withNode(id, function(node)
      {
          return {
              scene: {
                  width: node.scrollWidth,
                  height: node.scrollHeight
              },
              viewport: {
                  x: node.scrollLeft,
                  y: node.scrollTop,
                  width: node.clientWidth,
                  height: node.clientHeight
              }
          };
      });
  }
  
  
  var _Browser_setViewportOf = F3(function(id, x, y)
  {
      return _Browser_withNode(id, function(node)
      {
          node.scrollLeft = x;
          node.scrollTop = y;
          return _Utils_Tuple0;
      });
  });
  
  
  
  // ELEMENT
  
  
  function _Browser_getElement(id)
  {
      return _Browser_withNode(id, function(node)
      {
          var rect = node.getBoundingClientRect();
          var x = _Browser_window.pageXOffset;
          var y = _Browser_window.pageYOffset;
          return {
              scene: _Browser_getScene(),
              viewport: {
                  x: x,
                  y: y,
                  width: _Browser_doc.documentElement.clientWidth,
                  height: _Browser_doc.documentElement.clientHeight
              },
              element: {
                  x: x + rect.left,
                  y: y + rect.top,
                  width: rect.width,
                  height: rect.height
              }
          };
      });
  }
  
  
  
  // LOAD and RELOAD
  
  
  function _Browser_reload(skipCache)
  {
      return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
      {
          _VirtualDom_doc.location.reload(skipCache);
      }));
  }
  
  function _Browser_load(url)
  {
      return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
      {
          try
          {
              _Browser_window.location = url;
          }
          catch(err)
          {
              // Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
              // Other browsers reload the page, so let's be consistent about that.
              _VirtualDom_doc.location.reload(false);
          }
      }));
  }
  
  
  
  var _Bitwise_and = F2(function(a, b)
  {
      return a & b;
  });
  
  var _Bitwise_or = F2(function(a, b)
  {
      return a | b;
  });
  
  var _Bitwise_xor = F2(function(a, b)
  {
      return a ^ b;
  });
  
  function _Bitwise_complement(a)
  {
      return ~a;
  };
  
  var _Bitwise_shiftLeftBy = F2(function(offset, a)
  {
      return a << offset;
  });
  
  var _Bitwise_shiftRightBy = F2(function(offset, a)
  {
      return a >> offset;
  });
  
  var _Bitwise_shiftRightZfBy = F2(function(offset, a)
  {
      return a >>> offset;
  });
  var $author$project$Main$init = 'No element selected!!, click on an edge/node to select it';
  var $elm$core$Basics$EQ = {$: 'EQ'};
  var $elm$core$Basics$GT = {$: 'GT'};
  var $elm$core$Basics$LT = {$: 'LT'};
  var $elm$core$List$cons = _List_cons;
  var $elm$core$Dict$foldr = F3(
      function (func, acc, t) {
          foldr:
          while (true) {
              if (t.$ === 'RBEmpty_elm_builtin') {
                  return acc;
              } else {
                  var key = t.b;
                  var value = t.c;
                  var left = t.d;
                  var right = t.e;
                  var $temp$func = func,
                      $temp$acc = A3(
                      func,
                      key,
                      value,
                      A3($elm$core$Dict$foldr, func, acc, right)),
                      $temp$t = left;
                  func = $temp$func;
                  acc = $temp$acc;
                  t = $temp$t;
                  continue foldr;
              }
          }
      });
  var $elm$core$Dict$toList = function (dict) {
      return A3(
          $elm$core$Dict$foldr,
          F3(
              function (key, value, list) {
                  return A2(
                      $elm$core$List$cons,
                      _Utils_Tuple2(key, value),
                      list);
              }),
          _List_Nil,
          dict);
  };
  var $elm$core$Dict$keys = function (dict) {
      return A3(
          $elm$core$Dict$foldr,
          F3(
              function (key, value, keyList) {
                  return A2($elm$core$List$cons, key, keyList);
              }),
          _List_Nil,
          dict);
  };
  var $elm$core$Set$toList = function (_v0) {
      var dict = _v0.a;
      return $elm$core$Dict$keys(dict);
  };
  var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
  var $elm$core$Array$foldr = F3(
      function (func, baseCase, _v0) {
          var tree = _v0.c;
          var tail = _v0.d;
          var helper = F2(
              function (node, acc) {
                  if (node.$ === 'SubTree') {
                      var subTree = node.a;
                      return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
                  } else {
                      var values = node.a;
                      return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
                  }
              });
          return A3(
              $elm$core$Elm$JsArray$foldr,
              helper,
              A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
              tree);
      });
  var $elm$core$Array$toList = function (array) {
      return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
  };
  var $elm$core$Result$Err = function (a) {
      return {$: 'Err', a: a};
  };
  var $elm$json$Json$Decode$Failure = F2(
      function (a, b) {
          return {$: 'Failure', a: a, b: b};
      });
  var $elm$json$Json$Decode$Field = F2(
      function (a, b) {
          return {$: 'Field', a: a, b: b};
      });
  var $elm$json$Json$Decode$Index = F2(
      function (a, b) {
          return {$: 'Index', a: a, b: b};
      });
  var $elm$core$Result$Ok = function (a) {
      return {$: 'Ok', a: a};
  };
  var $elm$json$Json$Decode$OneOf = function (a) {
      return {$: 'OneOf', a: a};
  };
  var $elm$core$Basics$False = {$: 'False'};
  var $elm$core$Basics$add = _Basics_add;
  var $elm$core$Maybe$Just = function (a) {
      return {$: 'Just', a: a};
  };
  var $elm$core$Maybe$Nothing = {$: 'Nothing'};
  var $elm$core$String$all = _String_all;
  var $elm$core$Basics$and = _Basics_and;
  var $elm$core$Basics$append = _Utils_append;
  var $elm$json$Json$Encode$encode = _Json_encode;
  var $elm$core$String$fromInt = _String_fromNumber;
  var $elm$core$String$join = F2(
      function (sep, chunks) {
          return A2(
              _String_join,
              sep,
              _List_toArray(chunks));
      });
  var $elm$core$String$split = F2(
      function (sep, string) {
          return _List_fromArray(
              A2(_String_split, sep, string));
      });
  var $elm$json$Json$Decode$indent = function (str) {
      return A2(
          $elm$core$String$join,
          '\n    ',
          A2($elm$core$String$split, '\n', str));
  };
  var $elm$core$List$foldl = F3(
      function (func, acc, list) {
          foldl:
          while (true) {
              if (!list.b) {
                  return acc;
              } else {
                  var x = list.a;
                  var xs = list.b;
                  var $temp$func = func,
                      $temp$acc = A2(func, x, acc),
                      $temp$list = xs;
                  func = $temp$func;
                  acc = $temp$acc;
                  list = $temp$list;
                  continue foldl;
              }
          }
      });
  var $elm$core$List$length = function (xs) {
      return A3(
          $elm$core$List$foldl,
          F2(
              function (_v0, i) {
                  return i + 1;
              }),
          0,
          xs);
  };
  var $elm$core$List$map2 = _List_map2;
  var $elm$core$Basics$le = _Utils_le;
  var $elm$core$Basics$sub = _Basics_sub;
  var $elm$core$List$rangeHelp = F3(
      function (lo, hi, list) {
          rangeHelp:
          while (true) {
              if (_Utils_cmp(lo, hi) < 1) {
                  var $temp$lo = lo,
                      $temp$hi = hi - 1,
                      $temp$list = A2($elm$core$List$cons, hi, list);
                  lo = $temp$lo;
                  hi = $temp$hi;
                  list = $temp$list;
                  continue rangeHelp;
              } else {
                  return list;
              }
          }
      });
  var $elm$core$List$range = F2(
      function (lo, hi) {
          return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
      });
  var $elm$core$List$indexedMap = F2(
      function (f, xs) {
          return A3(
              $elm$core$List$map2,
              f,
              A2(
                  $elm$core$List$range,
                  0,
                  $elm$core$List$length(xs) - 1),
              xs);
      });
  var $elm$core$Char$toCode = _Char_toCode;
  var $elm$core$Char$isLower = function (_char) {
      var code = $elm$core$Char$toCode(_char);
      return (97 <= code) && (code <= 122);
  };
  var $elm$core$Char$isUpper = function (_char) {
      var code = $elm$core$Char$toCode(_char);
      return (code <= 90) && (65 <= code);
  };
  var $elm$core$Basics$or = _Basics_or;
  var $elm$core$Char$isAlpha = function (_char) {
      return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
  };
  var $elm$core$Char$isDigit = function (_char) {
      var code = $elm$core$Char$toCode(_char);
      return (code <= 57) && (48 <= code);
  };
  var $elm$core$Char$isAlphaNum = function (_char) {
      return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
  };
  var $elm$core$List$reverse = function (list) {
      return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
  };
  var $elm$core$String$uncons = _String_uncons;
  var $elm$json$Json$Decode$errorOneOf = F2(
      function (i, error) {
          return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
              $elm$json$Json$Decode$errorToString(error))));
      });
  var $elm$json$Json$Decode$errorToString = function (error) {
      return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
  };
  var $elm$json$Json$Decode$errorToStringHelp = F2(
      function (error, context) {
          errorToStringHelp:
          while (true) {
              switch (error.$) {
                  case 'Field':
                      var f = error.a;
                      var err = error.b;
                      var isSimple = function () {
                          var _v1 = $elm$core$String$uncons(f);
                          if (_v1.$ === 'Nothing') {
                              return false;
                          } else {
                              var _v2 = _v1.a;
                              var _char = _v2.a;
                              var rest = _v2.b;
                              return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
                          }
                      }();
                      var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
                      var $temp$error = err,
                          $temp$context = A2($elm$core$List$cons, fieldName, context);
                      error = $temp$error;
                      context = $temp$context;
                      continue errorToStringHelp;
                  case 'Index':
                      var i = error.a;
                      var err = error.b;
                      var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
                      var $temp$error = err,
                          $temp$context = A2($elm$core$List$cons, indexName, context);
                      error = $temp$error;
                      context = $temp$context;
                      continue errorToStringHelp;
                  case 'OneOf':
                      var errors = error.a;
                      if (!errors.b) {
                          return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
                              if (!context.b) {
                                  return '!';
                              } else {
                                  return ' at json' + A2(
                                      $elm$core$String$join,
                                      '',
                                      $elm$core$List$reverse(context));
                              }
                          }();
                      } else {
                          if (!errors.b.b) {
                              var err = errors.a;
                              var $temp$error = err,
                                  $temp$context = context;
                              error = $temp$error;
                              context = $temp$context;
                              continue errorToStringHelp;
                          } else {
                              var starter = function () {
                                  if (!context.b) {
                                      return 'Json.Decode.oneOf';
                                  } else {
                                      return 'The Json.Decode.oneOf at json' + A2(
                                          $elm$core$String$join,
                                          '',
                                          $elm$core$List$reverse(context));
                                  }
                              }();
                              var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
                                  $elm$core$List$length(errors)) + ' ways:'));
                              return A2(
                                  $elm$core$String$join,
                                  '\n\n',
                                  A2(
                                      $elm$core$List$cons,
                                      introduction,
                                      A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
                          }
                      }
                  default:
                      var msg = error.a;
                      var json = error.b;
                      var introduction = function () {
                          if (!context.b) {
                              return 'Problem with the given value:\n\n';
                          } else {
                              return 'Problem with the value at json' + (A2(
                                  $elm$core$String$join,
                                  '',
                                  $elm$core$List$reverse(context)) + ':\n\n    ');
                          }
                      }();
                      return introduction + ($elm$json$Json$Decode$indent(
                          A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
              }
          }
      });
  var $elm$core$Array$branchFactor = 32;
  var $elm$core$Array$Array_elm_builtin = F4(
      function (a, b, c, d) {
          return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
      });
  var $elm$core$Elm$JsArray$empty = _JsArray_empty;
  var $elm$core$Basics$ceiling = _Basics_ceiling;
  var $elm$core$Basics$fdiv = _Basics_fdiv;
  var $elm$core$Basics$logBase = F2(
      function (base, number) {
          return _Basics_log(number) / _Basics_log(base);
      });
  var $elm$core$Basics$toFloat = _Basics_toFloat;
  var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
      A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
  var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
  var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
  var $elm$core$Array$Leaf = function (a) {
      return {$: 'Leaf', a: a};
  };
  var $elm$core$Basics$apL = F2(
      function (f, x) {
          return f(x);
      });
  var $elm$core$Basics$apR = F2(
      function (x, f) {
          return f(x);
      });
  var $elm$core$Basics$eq = _Utils_equal;
  var $elm$core$Basics$floor = _Basics_floor;
  var $elm$core$Elm$JsArray$length = _JsArray_length;
  var $elm$core$Basics$gt = _Utils_gt;
  var $elm$core$Basics$max = F2(
      function (x, y) {
          return (_Utils_cmp(x, y) > 0) ? x : y;
      });
  var $elm$core$Basics$mul = _Basics_mul;
  var $elm$core$Array$SubTree = function (a) {
      return {$: 'SubTree', a: a};
  };
  var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
  var $elm$core$Array$compressNodes = F2(
      function (nodes, acc) {
          compressNodes:
          while (true) {
              var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
              var node = _v0.a;
              var remainingNodes = _v0.b;
              var newAcc = A2(
                  $elm$core$List$cons,
                  $elm$core$Array$SubTree(node),
                  acc);
              if (!remainingNodes.b) {
                  return $elm$core$List$reverse(newAcc);
              } else {
                  var $temp$nodes = remainingNodes,
                      $temp$acc = newAcc;
                  nodes = $temp$nodes;
                  acc = $temp$acc;
                  continue compressNodes;
              }
          }
      });
  var $elm$core$Tuple$first = function (_v0) {
      var x = _v0.a;
      return x;
  };
  var $elm$core$Array$treeFromBuilder = F2(
      function (nodeList, nodeListSize) {
          treeFromBuilder:
          while (true) {
              var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
              if (newNodeSize === 1) {
                  return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
              } else {
                  var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
                      $temp$nodeListSize = newNodeSize;
                  nodeList = $temp$nodeList;
                  nodeListSize = $temp$nodeListSize;
                  continue treeFromBuilder;
              }
          }
      });
  var $elm$core$Array$builderToArray = F2(
      function (reverseNodeList, builder) {
          if (!builder.nodeListSize) {
              return A4(
                  $elm$core$Array$Array_elm_builtin,
                  $elm$core$Elm$JsArray$length(builder.tail),
                  $elm$core$Array$shiftStep,
                  $elm$core$Elm$JsArray$empty,
                  builder.tail);
          } else {
              var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
              var depth = $elm$core$Basics$floor(
                  A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
              var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
              var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
              return A4(
                  $elm$core$Array$Array_elm_builtin,
                  $elm$core$Elm$JsArray$length(builder.tail) + treeLen,
                  A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
                  tree,
                  builder.tail);
          }
      });
  var $elm$core$Basics$idiv = _Basics_idiv;
  var $elm$core$Basics$lt = _Utils_lt;
  var $elm$core$Array$initializeHelp = F5(
      function (fn, fromIndex, len, nodeList, tail) {
          initializeHelp:
          while (true) {
              if (fromIndex < 0) {
                  return A2(
                      $elm$core$Array$builderToArray,
                      false,
                      {nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
              } else {
                  var leaf = $elm$core$Array$Leaf(
                      A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
                  var $temp$fn = fn,
                      $temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
                      $temp$len = len,
                      $temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
                      $temp$tail = tail;
                  fn = $temp$fn;
                  fromIndex = $temp$fromIndex;
                  len = $temp$len;
                  nodeList = $temp$nodeList;
                  tail = $temp$tail;
                  continue initializeHelp;
              }
          }
      });
  var $elm$core$Basics$remainderBy = _Basics_remainderBy;
  var $elm$core$Array$initialize = F2(
      function (len, fn) {
          if (len <= 0) {
              return $elm$core$Array$empty;
          } else {
              var tailLen = len % $elm$core$Array$branchFactor;
              var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
              var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
              return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
          }
      });
  var $elm$core$Basics$True = {$: 'True'};
  var $elm$core$Result$isOk = function (result) {
      if (result.$ === 'Ok') {
          return true;
      } else {
          return false;
      }
  };
  var $elm$json$Json$Decode$map = _Json_map1;
  var $elm$json$Json$Decode$map2 = _Json_map2;
  var $elm$json$Json$Decode$succeed = _Json_succeed;
  var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
      switch (handler.$) {
          case 'Normal':
              return 0;
          case 'MayStopPropagation':
              return 1;
          case 'MayPreventDefault':
              return 2;
          default:
              return 3;
      }
  };
  var $elm$browser$Browser$External = function (a) {
      return {$: 'External', a: a};
  };
  var $elm$browser$Browser$Internal = function (a) {
      return {$: 'Internal', a: a};
  };
  var $elm$core$Basics$identity = function (x) {
      return x;
  };
  var $elm$browser$Browser$Dom$NotFound = function (a) {
      return {$: 'NotFound', a: a};
  };
  var $elm$url$Url$Http = {$: 'Http'};
  var $elm$url$Url$Https = {$: 'Https'};
  var $elm$url$Url$Url = F6(
      function (protocol, host, port_, path, query, fragment) {
          return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
      });
  var $elm$core$String$contains = _String_contains;
  var $elm$core$String$length = _String_length;
  var $elm$core$String$slice = _String_slice;
  var $elm$core$String$dropLeft = F2(
      function (n, string) {
          return (n < 1) ? string : A3(
              $elm$core$String$slice,
              n,
              $elm$core$String$length(string),
              string);
      });
  var $elm$core$String$indexes = _String_indexes;
  var $elm$core$String$isEmpty = function (string) {
      return string === '';
  };
  var $elm$core$String$left = F2(
      function (n, string) {
          return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
      });
  var $elm$core$String$toInt = _String_toInt;
  var $elm$url$Url$chompBeforePath = F5(
      function (protocol, path, params, frag, str) {
          if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
              return $elm$core$Maybe$Nothing;
          } else {
              var _v0 = A2($elm$core$String$indexes, ':', str);
              if (!_v0.b) {
                  return $elm$core$Maybe$Just(
                      A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
              } else {
                  if (!_v0.b.b) {
                      var i = _v0.a;
                      var _v1 = $elm$core$String$toInt(
                          A2($elm$core$String$dropLeft, i + 1, str));
                      if (_v1.$ === 'Nothing') {
                          return $elm$core$Maybe$Nothing;
                      } else {
                          var port_ = _v1;
                          return $elm$core$Maybe$Just(
                              A6(
                                  $elm$url$Url$Url,
                                  protocol,
                                  A2($elm$core$String$left, i, str),
                                  port_,
                                  path,
                                  params,
                                  frag));
                      }
                  } else {
                      return $elm$core$Maybe$Nothing;
                  }
              }
          }
      });
  var $elm$url$Url$chompBeforeQuery = F4(
      function (protocol, params, frag, str) {
          if ($elm$core$String$isEmpty(str)) {
              return $elm$core$Maybe$Nothing;
          } else {
              var _v0 = A2($elm$core$String$indexes, '/', str);
              if (!_v0.b) {
                  return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
              } else {
                  var i = _v0.a;
                  return A5(
                      $elm$url$Url$chompBeforePath,
                      protocol,
                      A2($elm$core$String$dropLeft, i, str),
                      params,
                      frag,
                      A2($elm$core$String$left, i, str));
              }
          }
      });
  var $elm$url$Url$chompBeforeFragment = F3(
      function (protocol, frag, str) {
          if ($elm$core$String$isEmpty(str)) {
              return $elm$core$Maybe$Nothing;
          } else {
              var _v0 = A2($elm$core$String$indexes, '?', str);
              if (!_v0.b) {
                  return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
              } else {
                  var i = _v0.a;
                  return A4(
                      $elm$url$Url$chompBeforeQuery,
                      protocol,
                      $elm$core$Maybe$Just(
                          A2($elm$core$String$dropLeft, i + 1, str)),
                      frag,
                      A2($elm$core$String$left, i, str));
              }
          }
      });
  var $elm$url$Url$chompAfterProtocol = F2(
      function (protocol, str) {
          if ($elm$core$String$isEmpty(str)) {
              return $elm$core$Maybe$Nothing;
          } else {
              var _v0 = A2($elm$core$String$indexes, '#', str);
              if (!_v0.b) {
                  return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
              } else {
                  var i = _v0.a;
                  return A3(
                      $elm$url$Url$chompBeforeFragment,
                      protocol,
                      $elm$core$Maybe$Just(
                          A2($elm$core$String$dropLeft, i + 1, str)),
                      A2($elm$core$String$left, i, str));
              }
          }
      });
  var $elm$core$String$startsWith = _String_startsWith;
  var $elm$url$Url$fromString = function (str) {
      return A2($elm$core$String$startsWith, 'http://', str) ? A2(
          $elm$url$Url$chompAfterProtocol,
          $elm$url$Url$Http,
          A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
          $elm$url$Url$chompAfterProtocol,
          $elm$url$Url$Https,
          A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
  };
  var $elm$core$Basics$never = function (_v0) {
      never:
      while (true) {
          var nvr = _v0.a;
          var $temp$_v0 = nvr;
          _v0 = $temp$_v0;
          continue never;
      }
  };
  var $elm$core$Task$Perform = function (a) {
      return {$: 'Perform', a: a};
  };
  var $elm$core$Task$succeed = _Scheduler_succeed;
  var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
  var $elm$core$List$foldrHelper = F4(
      function (fn, acc, ctr, ls) {
          if (!ls.b) {
              return acc;
          } else {
              var a = ls.a;
              var r1 = ls.b;
              if (!r1.b) {
                  return A2(fn, a, acc);
              } else {
                  var b = r1.a;
                  var r2 = r1.b;
                  if (!r2.b) {
                      return A2(
                          fn,
                          a,
                          A2(fn, b, acc));
                  } else {
                      var c = r2.a;
                      var r3 = r2.b;
                      if (!r3.b) {
                          return A2(
                              fn,
                              a,
                              A2(
                                  fn,
                                  b,
                                  A2(fn, c, acc)));
                      } else {
                          var d = r3.a;
                          var r4 = r3.b;
                          var res = (ctr > 500) ? A3(
                              $elm$core$List$foldl,
                              fn,
                              acc,
                              $elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
                          return A2(
                              fn,
                              a,
                              A2(
                                  fn,
                                  b,
                                  A2(
                                      fn,
                                      c,
                                      A2(fn, d, res))));
                      }
                  }
              }
          }
      });
  var $elm$core$List$foldr = F3(
      function (fn, acc, ls) {
          return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
      });
  var $elm$core$List$map = F2(
      function (f, xs) {
          return A3(
              $elm$core$List$foldr,
              F2(
                  function (x, acc) {
                      return A2(
                          $elm$core$List$cons,
                          f(x),
                          acc);
                  }),
              _List_Nil,
              xs);
      });
  var $elm$core$Task$andThen = _Scheduler_andThen;
  var $elm$core$Task$map = F2(
      function (func, taskA) {
          return A2(
              $elm$core$Task$andThen,
              function (a) {
                  return $elm$core$Task$succeed(
                      func(a));
              },
              taskA);
      });
  var $elm$core$Task$map2 = F3(
      function (func, taskA, taskB) {
          return A2(
              $elm$core$Task$andThen,
              function (a) {
                  return A2(
                      $elm$core$Task$andThen,
                      function (b) {
                          return $elm$core$Task$succeed(
                              A2(func, a, b));
                      },
                      taskB);
              },
              taskA);
      });
  var $elm$core$Task$sequence = function (tasks) {
      return A3(
          $elm$core$List$foldr,
          $elm$core$Task$map2($elm$core$List$cons),
          $elm$core$Task$succeed(_List_Nil),
          tasks);
  };
  var $elm$core$Platform$sendToApp = _Platform_sendToApp;
  var $elm$core$Task$spawnCmd = F2(
      function (router, _v0) {
          var task = _v0.a;
          return _Scheduler_spawn(
              A2(
                  $elm$core$Task$andThen,
                  $elm$core$Platform$sendToApp(router),
                  task));
      });
  var $elm$core$Task$onEffects = F3(
      function (router, commands, state) {
          return A2(
              $elm$core$Task$map,
              function (_v0) {
                  return _Utils_Tuple0;
              },
              $elm$core$Task$sequence(
                  A2(
                      $elm$core$List$map,
                      $elm$core$Task$spawnCmd(router),
                      commands)));
      });
  var $elm$core$Task$onSelfMsg = F3(
      function (_v0, _v1, _v2) {
          return $elm$core$Task$succeed(_Utils_Tuple0);
      });
  var $elm$core$Task$cmdMap = F2(
      function (tagger, _v0) {
          var task = _v0.a;
          return $elm$core$Task$Perform(
              A2($elm$core$Task$map, tagger, task));
      });
  _Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
  var $elm$core$Task$command = _Platform_leaf('Task');
  var $elm$core$Task$perform = F2(
      function (toMessage, task) {
          return $elm$core$Task$command(
              $elm$core$Task$Perform(
                  A2($elm$core$Task$map, toMessage, task)));
      });
  var $elm$core$Platform$Cmd$batch = _Platform_batch;
  var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
  var $elm$core$Platform$Sub$batch = _Platform_batch;
  var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
  var $elm$browser$Browser$sandbox = function (impl) {
      return _Browser_element(
          {
              init: function (_v0) {
                  return _Utils_Tuple2(impl.init, $elm$core$Platform$Cmd$none);
              },
              subscriptions: function (_v1) {
                  return $elm$core$Platform$Sub$none;
              },
              update: F2(
                  function (msg, model) {
                      return _Utils_Tuple2(
                          A2(impl.update, msg, model),
                          $elm$core$Platform$Cmd$none);
                  }),
              view: impl.view
          });
  };
  var $author$project$Main$update = F2(
      function (msg, _v0) {
          if (msg.$ === 'SelectNode') {
              var v = msg.a;
              return 'You selected node ' + $elm$core$String$fromInt(v);
          } else {
              var _v2 = msg.a;
              var from = _v2.a;
              var to = _v2.b;
              return 'You selected edge from ' + ($elm$core$String$fromInt(from) + (' to ' + $elm$core$String$fromInt(to)));
          }
      });
  var $elm$html$Html$div = _VirtualDom_node('div');
  var $elm$html$Html$h1 = _VirtualDom_node('h1');
  var $elm_community$graph$Graph$Edge = F3(
      function (from, to, label) {
          return {from: from, label: label, to: to};
      });
  var $elm_community$graph$Graph$Node = F2(
      function (id, label) {
          return {id: id, label: label};
      });
  var $elm_community$graph$Graph$Graph = function (a) {
      return {$: 'Graph', a: a};
  };
  var $elm_community$graph$Graph$NodeContext = F3(
      function (node, incoming, outgoing) {
          return {incoming: incoming, node: node, outgoing: outgoing};
      });
  var $elm_community$intdict$IntDict$Empty = {$: 'Empty'};
  var $elm_community$intdict$IntDict$empty = $elm_community$intdict$IntDict$Empty;
  var $elm$core$Basics$always = F2(
      function (a, _v0) {
          return a;
      });
  var $elm_community$intdict$IntDict$Inner = function (a) {
      return {$: 'Inner', a: a};
  };
  var $elm_community$intdict$IntDict$size = function (dict) {
      switch (dict.$) {
          case 'Empty':
              return 0;
          case 'Leaf':
              return 1;
          default:
              var i = dict.a;
              return i.size;
      }
  };
  var $elm_community$intdict$IntDict$inner = F3(
      function (p, l, r) {
          var _v0 = _Utils_Tuple2(l, r);
          if (_v0.a.$ === 'Empty') {
              var _v1 = _v0.a;
              return r;
          } else {
              if (_v0.b.$ === 'Empty') {
                  var _v2 = _v0.b;
                  return l;
              } else {
                  return $elm_community$intdict$IntDict$Inner(
                      {
                          left: l,
                          prefix: p,
                          right: r,
                          size: $elm_community$intdict$IntDict$size(l) + $elm_community$intdict$IntDict$size(r)
                      });
              }
          }
      });
  var $elm$core$Bitwise$and = _Bitwise_and;
  var $elm$core$Basics$composeR = F3(
      function (f, g, x) {
          return g(
              f(x));
      });
  var $elm$core$Basics$neq = _Utils_notEqual;
  var $elm$core$Bitwise$complement = _Bitwise_complement;
  var $elm$core$Bitwise$or = _Bitwise_or;
  var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
  var $elm_community$intdict$IntDict$highestBitSet = function (n) {
      var shiftOr = F2(
          function (i, shift) {
              return i | (i >>> shift);
          });
      var n1 = A2(shiftOr, n, 1);
      var n2 = A2(shiftOr, n1, 2);
      var n3 = A2(shiftOr, n2, 4);
      var n4 = A2(shiftOr, n3, 8);
      var n5 = A2(shiftOr, n4, 16);
      return n5 & (~(n5 >>> 1));
  };
  var $elm$core$Basics$negate = function (n) {
      return -n;
  };
  var $elm_community$intdict$IntDict$signBit = $elm_community$intdict$IntDict$highestBitSet(-1);
  var $elm$core$Bitwise$xor = _Bitwise_xor;
  var $elm_community$intdict$IntDict$isBranchingBitSet = function (p) {
      return A2(
          $elm$core$Basics$composeR,
          $elm$core$Bitwise$xor($elm_community$intdict$IntDict$signBit),
          A2(
              $elm$core$Basics$composeR,
              $elm$core$Bitwise$and(p.branchingBit),
              $elm$core$Basics$neq(0)));
  };
  var $elm_community$intdict$IntDict$higherBitMask = function (branchingBit) {
      return branchingBit ^ (~(branchingBit - 1));
  };
  var $elm_community$intdict$IntDict$lcp = F2(
      function (x, y) {
          var branchingBit = $elm_community$intdict$IntDict$highestBitSet(x ^ y);
          var mask = $elm_community$intdict$IntDict$higherBitMask(branchingBit);
          var prefixBits = x & mask;
          return {branchingBit: branchingBit, prefixBits: prefixBits};
      });
  var $elm_community$intdict$IntDict$Leaf = function (a) {
      return {$: 'Leaf', a: a};
  };
  var $elm_community$intdict$IntDict$leaf = F2(
      function (k, v) {
          return $elm_community$intdict$IntDict$Leaf(
              {key: k, value: v});
      });
  var $elm_community$intdict$IntDict$prefixMatches = F2(
      function (p, n) {
          return _Utils_eq(
              n & $elm_community$intdict$IntDict$higherBitMask(p.branchingBit),
              p.prefixBits);
      });
  var $elm_community$intdict$IntDict$update = F3(
      function (key, alter, dict) {
          var join = F2(
              function (_v2, _v3) {
                  var k1 = _v2.a;
                  var l = _v2.b;
                  var k2 = _v3.a;
                  var r = _v3.b;
                  var prefix = A2($elm_community$intdict$IntDict$lcp, k1, k2);
                  return A2($elm_community$intdict$IntDict$isBranchingBitSet, prefix, k2) ? A3($elm_community$intdict$IntDict$inner, prefix, l, r) : A3($elm_community$intdict$IntDict$inner, prefix, r, l);
              });
          var alteredNode = function (mv) {
              var _v1 = alter(mv);
              if (_v1.$ === 'Just') {
                  var v = _v1.a;
                  return A2($elm_community$intdict$IntDict$leaf, key, v);
              } else {
                  return $elm_community$intdict$IntDict$empty;
              }
          };
          switch (dict.$) {
              case 'Empty':
                  return alteredNode($elm$core$Maybe$Nothing);
              case 'Leaf':
                  var l = dict.a;
                  return _Utils_eq(l.key, key) ? alteredNode(
                      $elm$core$Maybe$Just(l.value)) : A2(
                      join,
                      _Utils_Tuple2(
                          key,
                          alteredNode($elm$core$Maybe$Nothing)),
                      _Utils_Tuple2(l.key, dict));
              default:
                  var i = dict.a;
                  return A2($elm_community$intdict$IntDict$prefixMatches, i.prefix, key) ? (A2($elm_community$intdict$IntDict$isBranchingBitSet, i.prefix, key) ? A3(
                      $elm_community$intdict$IntDict$inner,
                      i.prefix,
                      i.left,
                      A3($elm_community$intdict$IntDict$update, key, alter, i.right)) : A3(
                      $elm_community$intdict$IntDict$inner,
                      i.prefix,
                      A3($elm_community$intdict$IntDict$update, key, alter, i.left),
                      i.right)) : A2(
                      join,
                      _Utils_Tuple2(
                          key,
                          alteredNode($elm$core$Maybe$Nothing)),
                      _Utils_Tuple2(i.prefix.prefixBits, dict));
          }
      });
  var $elm_community$intdict$IntDict$insert = F3(
      function (key, value, dict) {
          return A3(
              $elm_community$intdict$IntDict$update,
              key,
              $elm$core$Basics$always(
                  $elm$core$Maybe$Just(value)),
              dict);
      });
  var $elm$core$Maybe$map = F2(
      function (f, maybe) {
          if (maybe.$ === 'Just') {
              var value = maybe.a;
              return $elm$core$Maybe$Just(
                  f(value));
          } else {
              return $elm$core$Maybe$Nothing;
          }
      });
  var $elm$core$Basics$not = _Basics_not;
  var $elm_community$intdict$IntDict$get = F2(
      function (key, dict) {
          get:
          while (true) {
              switch (dict.$) {
                  case 'Empty':
                      return $elm$core$Maybe$Nothing;
                  case 'Leaf':
                      var l = dict.a;
                      return _Utils_eq(l.key, key) ? $elm$core$Maybe$Just(l.value) : $elm$core$Maybe$Nothing;
                  default:
                      var i = dict.a;
                      if (!A2($elm_community$intdict$IntDict$prefixMatches, i.prefix, key)) {
                          return $elm$core$Maybe$Nothing;
                      } else {
                          if (A2($elm_community$intdict$IntDict$isBranchingBitSet, i.prefix, key)) {
                              var $temp$key = key,
                                  $temp$dict = i.right;
                              key = $temp$key;
                              dict = $temp$dict;
                              continue get;
                          } else {
                              var $temp$key = key,
                                  $temp$dict = i.left;
                              key = $temp$key;
                              dict = $temp$dict;
                              continue get;
                          }
                      }
              }
          }
      });
  var $elm_community$intdict$IntDict$member = F2(
      function (key, dict) {
          var _v0 = A2($elm_community$intdict$IntDict$get, key, dict);
          if (_v0.$ === 'Just') {
              return true;
          } else {
              return false;
          }
      });
  var $elm_community$graph$Graph$fromNodesAndEdges = F2(
      function (nodes_, edges_) {
          var nodeRep = A3(
              $elm$core$List$foldl,
              function (n) {
                  return A2(
                      $elm_community$intdict$IntDict$insert,
                      n.id,
                      A3($elm_community$graph$Graph$NodeContext, n, $elm_community$intdict$IntDict$empty, $elm_community$intdict$IntDict$empty));
              },
              $elm_community$intdict$IntDict$empty,
              nodes_);
          var addEdge = F2(
              function (edge, rep) {
                  var updateOutgoing = function (ctx) {
                      return _Utils_update(
                          ctx,
                          {
                              outgoing: A3($elm_community$intdict$IntDict$insert, edge.to, edge.label, ctx.outgoing)
                          });
                  };
                  var updateIncoming = function (ctx) {
                      return _Utils_update(
                          ctx,
                          {
                              incoming: A3($elm_community$intdict$IntDict$insert, edge.from, edge.label, ctx.incoming)
                          });
                  };
                  return A3(
                      $elm_community$intdict$IntDict$update,
                      edge.to,
                      $elm$core$Maybe$map(updateIncoming),
                      A3(
                          $elm_community$intdict$IntDict$update,
                          edge.from,
                          $elm$core$Maybe$map(updateOutgoing),
                          rep));
              });
          var addEdgeIfValid = F2(
              function (edge, rep) {
                  return (A2($elm_community$intdict$IntDict$member, edge.from, rep) && A2($elm_community$intdict$IntDict$member, edge.to, rep)) ? A2(addEdge, edge, rep) : rep;
              });
          return $elm_community$graph$Graph$Graph(
              A3($elm$core$List$foldl, addEdgeIfValid, nodeRep, edges_));
      });
  var $elm$core$Tuple$second = function (_v0) {
      var y = _v0.b;
      return y;
  };
  var $elm_community$graph$Graph$fromNodeLabelsAndEdgePairs = F2(
      function (labels, edgePairs) {
          var nodes_ = A3(
              $elm$core$List$foldl,
              F2(
                  function (lbl, _v1) {
                      var id = _v1.a;
                      var nodes__ = _v1.b;
                      return _Utils_Tuple2(
                          id + 1,
                          A2(
                              $elm$core$List$cons,
                              A2($elm_community$graph$Graph$Node, id, lbl),
                              nodes__));
                  }),
              _Utils_Tuple2(0, _List_Nil),
              labels).b;
          var edges_ = A2(
              $elm$core$List$map,
              function (_v0) {
                  var from = _v0.a;
                  var to = _v0.b;
                  return A3($elm_community$graph$Graph$Edge, from, to, _Utils_Tuple0);
              },
              edgePairs);
          return A2($elm_community$graph$Graph$fromNodesAndEdges, nodes_, edges_);
      });
  var $author$project$Main$simpleGraph = A2(
      $elm_community$graph$Graph$fromNodeLabelsAndEdgePairs,
      _List_fromArray(
          [0, 1, 2, 3, 4, 5, 6, 7, 8]),
      _List_fromArray(
          [
              _Utils_Tuple2(0, 1),
              _Utils_Tuple2(0, 2),
              _Utils_Tuple2(1, 3),
              _Utils_Tuple2(1, 4),
              _Utils_Tuple2(2, 5),
              _Utils_Tuple2(2, 6),
              _Utils_Tuple2(3, 7),
              _Utils_Tuple2(3, 8),
              _Utils_Tuple2(0, 7),
              _Utils_Tuple2(0, 5),
              _Utils_Tuple2(4, 0),
              _Utils_Tuple2(6, 0),
              _Utils_Tuple2(4, 8),
              _Utils_Tuple2(6, 8),
              _Utils_Tuple2(7, 8)
          ]));
  var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
  var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
  var $goyalarchit$elm_dagre$Dagre$Attributes$LR = {$: 'LR'};
  var $author$project$Main$SelectEdge = function (a) {
      return {$: 'SelectEdge', a: a};
  };
  var $author$project$Main$SelectNode = function (a) {
      return {$: 'SelectNode', a: a};
  };
  var $goyalarchit$elm_dagre$Render$StandardDrawers$Types$Vee = {$: 'Vee'};
  var $goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$arrowHead = function (ah) {
      return function (edc) {
          return _Utils_update(
              edc,
              {arrowHead: ah});
      };
  };
  var $elm$virtual_dom$VirtualDom$attribute = F2(
      function (key, value) {
          return A2(
              _VirtualDom_attribute,
              _VirtualDom_noOnOrFormAction(key),
              _VirtualDom_noJavaScriptOrHtmlUri(value));
      });
  var $elm_community$typed_svg$TypedSvg$Core$attribute = $elm$virtual_dom$VirtualDom$attribute;
  var $elm_community$typed_svg$TypedSvg$Attributes$class = function (names) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'class',
          A2($elm$core$String$join, ' ', names));
  };
  var $elm_community$typed_svg$TypedSvg$Types$CursorPointer = {$: 'CursorPointer'};
  var $elm_community$typed_svg$TypedSvg$Types$Paint = function (a) {
      return {$: 'Paint', a: a};
  };
  var $elm_community$typed_svg$TypedSvg$Types$PaintNone = {$: 'PaintNone'};
  var $elm_community$typed_svg$TypedSvg$Types$Px = function (a) {
      return {$: 'Px', a: a};
  };
  var $folkertdev$one_true_path_experiment$SubPath$Leaf = function (a) {
      return {$: 'Leaf', a: a};
  };
  var $folkertdev$one_true_path_experiment$SubPath$Node = function (a) {
      return {$: 'Node', a: a};
  };
  var $folkertdev$one_true_path_experiment$SubPath$None = {$: 'None'};
  var $ianmackenzie$elm_geometry$CubicSpline2d$arcLengthParameterization = function (_v0) {
      var parameterized = _v0.a;
      return parameterized.parameterization;
  };
  var $ianmackenzie$elm_units$Quantity$Quantity = function (a) {
      return {$: 'Quantity', a: a};
  };
  var $ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtEnd = function (tree) {
      if (tree.$ === 'Node') {
          var node = tree.a;
          return node.lengthAtEnd;
      } else {
          var leaf = tree.a;
          return leaf.length8;
      }
  };
  var $ianmackenzie$elm_geometry$ArcLengthParameterization$totalArcLength = function (_v0) {
      var tree = _v0.a;
      return $ianmackenzie$elm_units$Quantity$Quantity(
          $ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtEnd(tree));
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$arcLength = function (parameterizedSpline) {
      return $ianmackenzie$elm_geometry$ArcLengthParameterization$totalArcLength(
          $ianmackenzie$elm_geometry$CubicSpline2d$arcLengthParameterization(parameterizedSpline));
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$arcLengthParameterization = function (_v0) {
      var parameterized = _v0.a;
      return parameterized.parameterization;
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$arcLength = function (parameterizedArc) {
      return $ianmackenzie$elm_geometry$ArcLengthParameterization$totalArcLength(
          $ianmackenzie$elm_geometry$EllipticalArc2d$arcLengthParameterization(parameterizedArc));
  };
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$arcLengthParameterization = function (_v0) {
      var parameterized = _v0.a;
      return parameterized.parameterization;
  };
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$arcLength = function (parameterizedSpline) {
      return $ianmackenzie$elm_geometry$ArcLengthParameterization$totalArcLength(
          $ianmackenzie$elm_geometry$QuadraticSpline2d$arcLengthParameterization(parameterizedSpline));
  };
  var $elm$core$Basics$abs = function (n) {
      return (n < 0) ? (-n) : n;
  };
  var $elm$core$Basics$sqrt = _Basics_sqrt;
  var $ianmackenzie$elm_units$Quantity$zero = $ianmackenzie$elm_units$Quantity$Quantity(0);
  var $ianmackenzie$elm_geometry$Vector2d$length = function (_v0) {
      var v = _v0.a;
      var largestComponent = A2(
          $elm$core$Basics$max,
          $elm$core$Basics$abs(v.x),
          $elm$core$Basics$abs(v.y));
      if (!largestComponent) {
          return $ianmackenzie$elm_units$Quantity$zero;
      } else {
          var scaledY = v.y / largestComponent;
          var scaledX = v.x / largestComponent;
          var scaledLength = $elm$core$Basics$sqrt((scaledX * scaledX) + (scaledY * scaledY));
          return $ianmackenzie$elm_units$Quantity$Quantity(scaledLength * largestComponent);
      }
  };
  var $ianmackenzie$elm_geometry$LineSegment2d$endpoints = function (_v0) {
      var endpoints_ = _v0.a;
      return endpoints_;
  };
  var $ianmackenzie$elm_geometry$Geometry$Types$Vector2d = function (a) {
      return {$: 'Vector2d', a: a};
  };
  var $ianmackenzie$elm_geometry$Vector2d$from = F2(
      function (_v0, _v1) {
          var p1 = _v0.a;
          var p2 = _v1.a;
          return $ianmackenzie$elm_geometry$Geometry$Types$Vector2d(
              {x: p2.x - p1.x, y: p2.y - p1.y});
      });
  var $ianmackenzie$elm_geometry$LineSegment2d$vector = function (lineSegment) {
      var _v0 = $ianmackenzie$elm_geometry$LineSegment2d$endpoints(lineSegment);
      var p1 = _v0.a;
      var p2 = _v0.b;
      return A2($ianmackenzie$elm_geometry$Vector2d$from, p1, p2);
  };
  var $ianmackenzie$elm_geometry$LineSegment2d$length = function (givenSegment) {
      return $ianmackenzie$elm_geometry$Vector2d$length(
          $ianmackenzie$elm_geometry$LineSegment2d$vector(givenSegment));
  };
  var $ianmackenzie$elm_units$Quantity$toFloat = function (_v0) {
      var value = _v0.a;
      return value;
  };
  var $folkertdev$one_true_path_experiment$Segment$arcLength = function (parameterized) {
      return $ianmackenzie$elm_units$Quantity$toFloat(
          function () {
              switch (parameterized.$) {
                  case 'ParameterizedLineSegment':
                      var lineSegment = parameterized.a;
                      return $ianmackenzie$elm_geometry$LineSegment2d$length(lineSegment);
                  case 'ParameterizedQuadratic':
                      var spline = parameterized.a;
                      return $ianmackenzie$elm_geometry$QuadraticSpline2d$arcLength(spline);
                  case 'ParameterizedCubic':
                      var spline = parameterized.a;
                      return $ianmackenzie$elm_geometry$CubicSpline2d$arcLength(spline);
                  default:
                      var arc = parameterized.a;
                      return $ianmackenzie$elm_geometry$EllipticalArc2d$arcLength(arc);
              }
          }());
  };
  var $folkertdev$one_true_path_experiment$SubPath$arcLength = function (parameterized) {
      switch (parameterized.$) {
          case 'None':
              return 0;
          case 'Leaf':
              var segment = parameterized.a.segment;
              return $folkertdev$one_true_path_experiment$Segment$arcLength(segment);
          default:
              var totalLength = parameterized.a.totalLength;
              return totalLength;
      }
  };
  var $folkertdev$one_true_path_experiment$Segment$ParameterizedArc = function (a) {
      return {$: 'ParameterizedArc', a: a};
  };
  var $folkertdev$one_true_path_experiment$Segment$ParameterizedCubic = function (a) {
      return {$: 'ParameterizedCubic', a: a};
  };
  var $folkertdev$one_true_path_experiment$Segment$ParameterizedLineSegment = function (a) {
      return {$: 'ParameterizedLineSegment', a: a};
  };
  var $folkertdev$one_true_path_experiment$Segment$ParameterizedQuadratic = function (a) {
      return {$: 'ParameterizedQuadratic', a: a};
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$ArcLengthParameterized = function (a) {
      return {$: 'ArcLengthParameterized', a: a};
  };
  var $ianmackenzie$elm_geometry$ArcLengthParameterization$ArcLengthParameterization = function (a) {
      return {$: 'ArcLengthParameterization', a: a};
  };
  var $ianmackenzie$elm_geometry$ArcLengthParameterization$Leaf = function (a) {
      return {$: 'Leaf', a: a};
  };
  var $ianmackenzie$elm_geometry$ArcLengthParameterization$Node = function (a) {
      return {$: 'Node', a: a};
  };
  var $ianmackenzie$elm_geometry$ArcLengthParameterization$buildTree = F5(
      function (derivativeMagnitude, lengthAtStart_, paramAtStart_, paramAtEnd, height) {
          var paramDelta = paramAtEnd - paramAtStart_;
          if (!height) {
              var paramStep = 0.125 * paramDelta;
              var param8 = paramAtEnd;
              var param7 = paramAtEnd - (0.125 * paramDelta);
              var param6 = paramAtEnd - (0.25 * paramDelta);
              var param5 = paramAtEnd - (0.375 * paramDelta);
              var param4 = paramAtStart_ + (0.5 * paramDelta);
              var param3 = paramAtStart_ + (0.375 * paramDelta);
              var param2 = paramAtStart_ + (0.25 * paramDelta);
              var param1 = paramAtStart_ + (0.125 * paramDelta);
              var param0 = paramAtStart_;
              var offset = 0.0625 * paramDelta;
              var length0 = lengthAtStart_;
              var _v0 = derivativeMagnitude(param7 + offset);
              var derivativeMagnitude7 = _v0.a;
              var _v1 = derivativeMagnitude(param6 + offset);
              var derivativeMagnitude6 = _v1.a;
              var _v2 = derivativeMagnitude(param5 + offset);
              var derivativeMagnitude5 = _v2.a;
              var _v3 = derivativeMagnitude(param4 + offset);
              var derivativeMagnitude4 = _v3.a;
              var _v4 = derivativeMagnitude(param3 + offset);
              var derivativeMagnitude3 = _v4.a;
              var _v5 = derivativeMagnitude(param2 + offset);
              var derivativeMagnitude2 = _v5.a;
              var _v6 = derivativeMagnitude(param1 + offset);
              var derivativeMagnitude1 = _v6.a;
              var _v7 = derivativeMagnitude(param0 + offset);
              var derivativeMagnitude0 = _v7.a;
              var length1 = length0 + (paramStep * derivativeMagnitude0);
              var length2 = length1 + (paramStep * derivativeMagnitude1);
              var length3 = length2 + (paramStep * derivativeMagnitude2);
              var length4 = length3 + (paramStep * derivativeMagnitude3);
              var length5 = length4 + (paramStep * derivativeMagnitude4);
              var length6 = length5 + (paramStep * derivativeMagnitude5);
              var length7 = length6 + (paramStep * derivativeMagnitude6);
              var length8 = length7 + (paramStep * derivativeMagnitude7);
              return $ianmackenzie$elm_geometry$ArcLengthParameterization$Leaf(
                  {length0: length0, length1: length1, length2: length2, length3: length3, length4: length4, length5: length5, length6: length6, length7: length7, length8: length8, param0: param0, param1: param1, param2: param2, param3: param3, param4: param4, param5: param5, param6: param6, param7: param7, param8: param8});
          } else {
              var paramAtMid = paramAtStart_ + (0.5 * paramDelta);
              var branchHeight = height - 1;
              var leftBranch = A5($ianmackenzie$elm_geometry$ArcLengthParameterization$buildTree, derivativeMagnitude, lengthAtStart_, paramAtStart_, paramAtMid, branchHeight);
              var lengthAtLeftEnd = $ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtEnd(leftBranch);
              var rightBranch = A5($ianmackenzie$elm_geometry$ArcLengthParameterization$buildTree, derivativeMagnitude, lengthAtLeftEnd, paramAtMid, paramAtEnd, branchHeight);
              return $ianmackenzie$elm_geometry$ArcLengthParameterization$Node(
                  {
                      leftBranch: leftBranch,
                      lengthAtEnd: $ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtEnd(rightBranch),
                      lengthAtStart: lengthAtStart_,
                      paramAtStart: paramAtStart_,
                      rightBranch: rightBranch
                  });
          }
      });
  var $ianmackenzie$elm_units$Quantity$lessThanOrEqualTo = F2(
      function (_v0, _v1) {
          var y = _v0.a;
          var x = _v1.a;
          return _Utils_cmp(x, y) < 1;
      });
  var $ianmackenzie$elm_units$Quantity$multiplyBy = F2(
      function (scale, _v0) {
          var value = _v0.a;
          return $ianmackenzie$elm_units$Quantity$Quantity(scale * value);
      });
  var $ianmackenzie$elm_units$Quantity$ratio = F2(
      function (_v0, _v1) {
          var x = _v0.a;
          var y = _v1.a;
          return x / y;
      });
  var $ianmackenzie$elm_geometry$ArcLengthParameterization$segmentsPerLeaf = 8;
  var $ianmackenzie$elm_geometry$ArcLengthParameterization$build = function (_v0) {
      var maxError = _v0.maxError;
      var derivativeMagnitude = _v0.derivativeMagnitude;
      var maxSecondDerivativeMagnitude = _v0.maxSecondDerivativeMagnitude;
      var height = function () {
          if (A2($ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, $ianmackenzie$elm_units$Quantity$zero, maxError)) {
              return 0;
          } else {
              var numSegments = A2(
                  $ianmackenzie$elm_units$Quantity$ratio,
                  maxSecondDerivativeMagnitude,
                  A2($ianmackenzie$elm_units$Quantity$multiplyBy, 8, maxError));
              var numLeaves = numSegments / $ianmackenzie$elm_geometry$ArcLengthParameterization$segmentsPerLeaf;
              return A2(
                  $elm$core$Basics$max,
                  0,
                  $elm$core$Basics$ceiling(
                      A2($elm$core$Basics$logBase, 2, numLeaves)));
          }
      }();
      return $ianmackenzie$elm_geometry$ArcLengthParameterization$ArcLengthParameterization(
          A5($ianmackenzie$elm_geometry$ArcLengthParameterization$buildTree, derivativeMagnitude, 0, 0, 1, height));
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$derivativeMagnitude = function (_v0) {
      var spline = _v0.a;
      var _v1 = spline.fourthControlPoint;
      var p4 = _v1.a;
      var x4 = p4.x;
      var y4 = p4.y;
      var _v2 = spline.thirdControlPoint;
      var p3 = _v2.a;
      var x3 = p3.x;
      var x34 = x4 - x3;
      var y3 = p3.y;
      var y34 = y4 - y3;
      var _v3 = spline.secondControlPoint;
      var p2 = _v3.a;
      var x2 = p2.x;
      var x23 = x3 - x2;
      var x234 = x34 - x23;
      var y2 = p2.y;
      var y23 = y3 - y2;
      var y234 = y34 - y23;
      var _v4 = spline.firstControlPoint;
      var p1 = _v4.a;
      var x1 = p1.x;
      var x12 = x2 - x1;
      var x123 = x23 - x12;
      var y1 = p1.y;
      var y12 = y2 - y1;
      var y123 = y23 - y12;
      return function (parameterValue) {
          var y24 = y23 + (parameterValue * y234);
          var y13 = y12 + (parameterValue * y123);
          var y14 = y13 + (parameterValue * (y24 - y13));
          var x24 = x23 + (parameterValue * x234);
          var x13 = x12 + (parameterValue * x123);
          var x14 = x13 + (parameterValue * (x24 - x13));
          return $ianmackenzie$elm_units$Quantity$Quantity(
              3 * $elm$core$Basics$sqrt((x14 * x14) + (y14 * y14)));
      };
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$fromNondegenerate = function (nondegenerateSpline) {
      switch (nondegenerateSpline.$) {
          case 'NonZeroThirdDerivative':
              var spline = nondegenerateSpline.a;
              return spline;
          case 'NonZeroSecondDerivative':
              var spline = nondegenerateSpline.a;
              return spline;
          default:
              var spline = nondegenerateSpline.a;
              return spline;
      }
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$firstControlPoint = function (_v0) {
      var spline = _v0.a;
      return spline.firstControlPoint;
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$fourthControlPoint = function (_v0) {
      var spline = _v0.a;
      return spline.fourthControlPoint;
  };
  var $ianmackenzie$elm_units$Quantity$max = F2(
      function (_v0, _v1) {
          var x = _v0.a;
          var y = _v1.a;
          return $ianmackenzie$elm_units$Quantity$Quantity(
              A2($elm$core$Basics$max, x, y));
      });
  var $ianmackenzie$elm_geometry$Vector2d$minus = F2(
      function (_v0, _v1) {
          var v2 = _v0.a;
          var v1 = _v1.a;
          return $ianmackenzie$elm_geometry$Geometry$Types$Vector2d(
              {x: v1.x - v2.x, y: v1.y - v2.y});
      });
  var $ianmackenzie$elm_geometry$CubicSpline2d$secondControlPoint = function (_v0) {
      var spline = _v0.a;
      return spline.secondControlPoint;
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint = function (_v0) {
      var spline = _v0.a;
      return spline.thirdControlPoint;
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$maxSecondDerivativeMagnitude = function (spline) {
      var p4 = $ianmackenzie$elm_geometry$CubicSpline2d$fourthControlPoint(spline);
      var p3 = $ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint(spline);
      var u3 = A2($ianmackenzie$elm_geometry$Vector2d$from, p3, p4);
      var p2 = $ianmackenzie$elm_geometry$CubicSpline2d$secondControlPoint(spline);
      var u2 = A2($ianmackenzie$elm_geometry$Vector2d$from, p2, p3);
      var v2 = A2($ianmackenzie$elm_geometry$Vector2d$minus, u2, u3);
      var p1 = $ianmackenzie$elm_geometry$CubicSpline2d$firstControlPoint(spline);
      var u1 = A2($ianmackenzie$elm_geometry$Vector2d$from, p1, p2);
      var v1 = A2($ianmackenzie$elm_geometry$Vector2d$minus, u1, u2);
      return A2(
          $ianmackenzie$elm_units$Quantity$multiplyBy,
          6,
          A2(
              $ianmackenzie$elm_units$Quantity$max,
              $ianmackenzie$elm_geometry$Vector2d$length(v1),
              $ianmackenzie$elm_geometry$Vector2d$length(v2)));
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$arcLengthParameterized = F2(
      function (_v0, nondegenerateSpline) {
          var maxError = _v0.maxError;
          var spline = $ianmackenzie$elm_geometry$CubicSpline2d$fromNondegenerate(nondegenerateSpline);
          var parameterization = $ianmackenzie$elm_geometry$ArcLengthParameterization$build(
              {
                  derivativeMagnitude: $ianmackenzie$elm_geometry$CubicSpline2d$derivativeMagnitude(spline),
                  maxError: maxError,
                  maxSecondDerivativeMagnitude: $ianmackenzie$elm_geometry$CubicSpline2d$maxSecondDerivativeMagnitude(spline)
              });
          return $ianmackenzie$elm_geometry$CubicSpline2d$ArcLengthParameterized(
              {nondegenerateSpline: nondegenerateSpline, parameterization: parameterization, underlyingSpline: spline});
      });
  var $ianmackenzie$elm_geometry$EllipticalArc2d$ArcLengthParameterized = function (a) {
      return {$: 'ArcLengthParameterized', a: a};
  };
  var $ianmackenzie$elm_units$Quantity$abs = function (_v0) {
      var value = _v0.a;
      return $ianmackenzie$elm_units$Quantity$Quantity(
          $elm$core$Basics$abs(value));
  };
  var $ianmackenzie$elm_units$Quantity$plus = F2(
      function (_v0, _v1) {
          var y = _v0.a;
          var x = _v1.a;
          return $ianmackenzie$elm_units$Quantity$Quantity(x + y);
      });
  var $elm$core$Basics$cos = _Basics_cos;
  var $ianmackenzie$elm_units$Angle$cos = function (_v0) {
      var angle = _v0.a;
      return $elm$core$Basics$cos(angle);
  };
  var $ianmackenzie$elm_geometry$Quantity$Extra$rCosTheta = F2(
      function (r, theta) {
          return A2(
              $ianmackenzie$elm_units$Quantity$multiplyBy,
              $ianmackenzie$elm_units$Angle$cos(theta),
              r);
      });
  var $elm$core$Basics$sin = _Basics_sin;
  var $ianmackenzie$elm_units$Angle$sin = function (_v0) {
      var angle = _v0.a;
      return $elm$core$Basics$sin(angle);
  };
  var $ianmackenzie$elm_geometry$Quantity$Extra$rSinTheta = F2(
      function (r, theta) {
          return A2(
              $ianmackenzie$elm_units$Quantity$multiplyBy,
              $ianmackenzie$elm_units$Angle$sin(theta),
              r);
      });
  var $ianmackenzie$elm_geometry$Quantity$Extra$rTheta = F2(
      function (_v0, _v1) {
          var r = _v0.a;
          var theta = _v1.a;
          return $ianmackenzie$elm_units$Quantity$Quantity(r * theta);
      });
  var $ianmackenzie$elm_units$Quantity$sqrt = function (_v0) {
      var value = _v0.a;
      return $ianmackenzie$elm_units$Quantity$Quantity(
          $elm$core$Basics$sqrt(value));
  };
  var $ianmackenzie$elm_units$Quantity$squared = function (_v0) {
      var value = _v0.a;
      return $ianmackenzie$elm_units$Quantity$Quantity(value * value);
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$startAngle = function (_v0) {
      var arc = _v0.a;
      return arc.startAngle;
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$sweptAngle = function (_v0) {
      var arc = _v0.a;
      return arc.sweptAngle;
  };
  var $ianmackenzie$elm_geometry$Ellipse2d$xRadius = function (_v0) {
      var ellipse = _v0.a;
      return ellipse.xRadius;
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$xRadius = function (_v0) {
      var arc = _v0.a;
      return $ianmackenzie$elm_geometry$Ellipse2d$xRadius(arc.ellipse);
  };
  var $ianmackenzie$elm_geometry$Ellipse2d$yRadius = function (_v0) {
      var ellipse = _v0.a;
      return ellipse.yRadius;
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$yRadius = function (_v0) {
      var arc = _v0.a;
      return $ianmackenzie$elm_geometry$Ellipse2d$yRadius(arc.ellipse);
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$derivativeMagnitude = function (arc) {
      var theta0 = $ianmackenzie$elm_geometry$EllipticalArc2d$startAngle(arc);
      var ry = $ianmackenzie$elm_geometry$EllipticalArc2d$yRadius(arc);
      var rx = $ianmackenzie$elm_geometry$EllipticalArc2d$xRadius(arc);
      var dTheta = $ianmackenzie$elm_geometry$EllipticalArc2d$sweptAngle(arc);
      var absDTheta = $ianmackenzie$elm_units$Quantity$abs(dTheta);
      return function (parameterValue) {
          var theta = A2(
              $ianmackenzie$elm_units$Quantity$plus,
              A2($ianmackenzie$elm_units$Quantity$multiplyBy, parameterValue, dTheta),
              theta0);
          var dy = A2($ianmackenzie$elm_geometry$Quantity$Extra$rCosTheta, ry, theta);
          var dx = A2($ianmackenzie$elm_geometry$Quantity$Extra$rSinTheta, rx, theta);
          var r = $ianmackenzie$elm_units$Quantity$sqrt(
              A2(
                  $ianmackenzie$elm_units$Quantity$plus,
                  $ianmackenzie$elm_units$Quantity$squared(dy),
                  $ianmackenzie$elm_units$Quantity$squared(dx)));
          return A2($ianmackenzie$elm_geometry$Quantity$Extra$rTheta, r, absDTheta);
      };
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$fromNondegenerate = function (nondegenerateArc) {
      switch (nondegenerateArc.$) {
          case 'Curved':
              var arc = nondegenerateArc.a;
              return arc;
          case 'Horizontal':
              var arc = nondegenerateArc.a;
              return arc;
          default:
              var arc = nondegenerateArc.a;
              return arc;
      }
  };
  var $ianmackenzie$elm_units_interval$Quantity$Interval$contains = F2(
      function (_v0, _v1) {
          var x = _v0.a;
          var _v2 = _v1.a;
          var a = _v2.a.a;
          var b = _v2.b.a;
          return (_Utils_cmp(a, x) < 1) && (_Utils_cmp(x, b) < 1);
      });
  var $ianmackenzie$elm_units$Quantity$float = function (value) {
      return $ianmackenzie$elm_units$Quantity$Quantity(value);
  };
  var $ianmackenzie$elm_units_interval$Quantity$Interval$Interval = function (a) {
      return {$: 'Interval', a: a};
  };
  var $ianmackenzie$elm_units_interval$Quantity$Interval$hull2 = F2(
      function (_v0, _v1) {
          var a = _v0.a;
          var b = _v1.a;
          return (_Utils_cmp(a, b) < 1) ? $ianmackenzie$elm_units_interval$Quantity$Interval$Interval(
              _Utils_Tuple2(
                  $ianmackenzie$elm_units$Quantity$Quantity(a),
                  $ianmackenzie$elm_units$Quantity$Quantity(b))) : $ianmackenzie$elm_units_interval$Quantity$Interval$Interval(
              _Utils_Tuple2(
                  $ianmackenzie$elm_units$Quantity$Quantity(b),
                  $ianmackenzie$elm_units$Quantity$Quantity(a)));
      });
  var $ianmackenzie$elm_units_interval$Quantity$Interval$from = $ianmackenzie$elm_units_interval$Quantity$Interval$hull2;
  var $elm$core$Basics$ge = _Utils_ge;
  var $ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo = F2(
      function (_v0, _v1) {
          var y = _v0.a;
          var x = _v1.a;
          return _Utils_cmp(x, y) > -1;
      });
  var $ianmackenzie$elm_units_interval$Quantity$Interval$maxValue = function (_v0) {
      var _v1 = _v0.a;
      var b = _v1.b;
      return b;
  };
  var $ianmackenzie$elm_units_interval$Quantity$Interval$minValue = function (_v0) {
      var _v1 = _v0.a;
      var a = _v1.a;
      return a;
  };
  var $ianmackenzie$elm_units_interval$Quantity$Interval$endpoints = function (_v0) {
      var intervalEndpoints = _v0.a;
      return intervalEndpoints;
  };
  var $ianmackenzie$elm_units_interval$Quantity$Interval$isSingleton = function (_v0) {
      var _v1 = _v0.a;
      var a = _v1.a;
      var b = _v1.b;
      return _Utils_eq(a, b);
  };
  var $elm$core$Basics$min = F2(
      function (x, y) {
          return (_Utils_cmp(x, y) < 0) ? x : y;
      });
  var $elm$core$Basics$pi = _Basics_pi;
  var $ianmackenzie$elm_units$Angle$radians = function (numRadians) {
      return $ianmackenzie$elm_units$Quantity$Quantity(numRadians);
  };
  var $ianmackenzie$elm_units_interval$Angle$Interval$cosIncludesMax = function (interval) {
      var twoPi = $ianmackenzie$elm_units$Angle$radians(2 * $elm$core$Basics$pi);
      var _v0 = $ianmackenzie$elm_units_interval$Quantity$Interval$endpoints(interval);
      var a = _v0.a;
      var b = _v0.b;
      var minBranch = $elm$core$Basics$floor(
          A2($ianmackenzie$elm_units$Quantity$ratio, a, twoPi));
      var maxBranch = $elm$core$Basics$floor(
          A2($ianmackenzie$elm_units$Quantity$ratio, b, twoPi));
      return !_Utils_eq(minBranch, maxBranch);
  };
  var $ianmackenzie$elm_units_interval$Quantity$Interval$plus = F2(
      function (_v0, _v1) {
          var delta = _v0.a;
          var _v2 = _v1.a;
          var a = _v2.a.a;
          var b = _v2.b.a;
          return $ianmackenzie$elm_units_interval$Quantity$Interval$Interval(
              _Utils_Tuple2(
                  $ianmackenzie$elm_units$Quantity$Quantity(a + delta),
                  $ianmackenzie$elm_units$Quantity$Quantity(b + delta)));
      });
  var $ianmackenzie$elm_units_interval$Angle$Interval$cosIncludesMinMax = function (interval) {
      return _Utils_Tuple2(
          $ianmackenzie$elm_units_interval$Angle$Interval$cosIncludesMax(
              A2(
                  $ianmackenzie$elm_units_interval$Quantity$Interval$plus,
                  $ianmackenzie$elm_units$Angle$radians($elm$core$Basics$pi),
                  interval)),
          $ianmackenzie$elm_units_interval$Angle$Interval$cosIncludesMax(interval));
  };
  var $ianmackenzie$elm_units_interval$Quantity$Interval$minus = F2(
      function (_v0, _v1) {
          var delta = _v0.a;
          var _v2 = _v1.a;
          var a = _v2.a.a;
          var b = _v2.b.a;
          return $ianmackenzie$elm_units_interval$Quantity$Interval$Interval(
              _Utils_Tuple2(
                  $ianmackenzie$elm_units$Quantity$Quantity(a - delta),
                  $ianmackenzie$elm_units$Quantity$Quantity(b - delta)));
      });
  var $ianmackenzie$elm_units_interval$Angle$Interval$sinIncludesMinMax = function (interval) {
      return $ianmackenzie$elm_units_interval$Angle$Interval$cosIncludesMinMax(
          A2(
              $ianmackenzie$elm_units_interval$Quantity$Interval$minus,
              $ianmackenzie$elm_units$Angle$radians($elm$core$Basics$pi / 2),
              interval));
  };
  var $ianmackenzie$elm_units_interval$Quantity$Interval$singleton = function (value) {
      return $ianmackenzie$elm_units_interval$Quantity$Interval$Interval(
          _Utils_Tuple2(value, value));
  };
  var $ianmackenzie$elm_units_interval$Angle$Interval$sin = function (interval) {
      if ($ianmackenzie$elm_units_interval$Quantity$Interval$isSingleton(interval)) {
          return $ianmackenzie$elm_units_interval$Quantity$Interval$singleton(
              $ianmackenzie$elm_units$Quantity$float(
                  $ianmackenzie$elm_units$Angle$sin(
                      $ianmackenzie$elm_units_interval$Quantity$Interval$minValue(interval))));
      } else {
          var _v0 = $ianmackenzie$elm_units_interval$Angle$Interval$sinIncludesMinMax(interval);
          var includesMin = _v0.a;
          var includesMax = _v0.b;
          var _v1 = $ianmackenzie$elm_units_interval$Quantity$Interval$endpoints(interval);
          var a = _v1.a;
          var b = _v1.b;
          var newMax = includesMax ? $ianmackenzie$elm_units$Quantity$float(1) : $ianmackenzie$elm_units$Quantity$float(
              A2(
                  $elm$core$Basics$max,
                  $ianmackenzie$elm_units$Angle$sin(a),
                  $ianmackenzie$elm_units$Angle$sin(b)));
          var newMin = includesMin ? $ianmackenzie$elm_units$Quantity$float(-1) : $ianmackenzie$elm_units$Quantity$float(
              A2(
                  $elm$core$Basics$min,
                  $ianmackenzie$elm_units$Angle$sin(a),
                  $ianmackenzie$elm_units$Angle$sin(b)));
          return A2($ianmackenzie$elm_units_interval$Quantity$Interval$from, newMin, newMax);
      }
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$maxSecondDerivativeMagnitude = function (arc) {
      var theta0 = $ianmackenzie$elm_geometry$EllipticalArc2d$startAngle(arc);
      var ry = $ianmackenzie$elm_geometry$EllipticalArc2d$yRadius(arc);
      var rx = $ianmackenzie$elm_geometry$EllipticalArc2d$xRadius(arc);
      var dTheta = $ianmackenzie$elm_geometry$EllipticalArc2d$sweptAngle(arc);
      var theta1 = A2($ianmackenzie$elm_units$Quantity$plus, dTheta, theta0);
      var thetaInterval = A2($ianmackenzie$elm_units_interval$Quantity$Interval$from, theta0, theta1);
      var sinThetaInterval = $ianmackenzie$elm_units_interval$Angle$Interval$sin(thetaInterval);
      var includeKx = A2($ianmackenzie$elm_units_interval$Quantity$Interval$contains, $ianmackenzie$elm_units$Quantity$zero, sinThetaInterval);
      var includeKy = _Utils_eq(
          $ianmackenzie$elm_units_interval$Quantity$Interval$maxValue(sinThetaInterval),
          $ianmackenzie$elm_units$Quantity$float(1)) || _Utils_eq(
          $ianmackenzie$elm_units_interval$Quantity$Interval$minValue(sinThetaInterval),
          $ianmackenzie$elm_units$Quantity$float(-1));
      var _v0 = $ianmackenzie$elm_units$Quantity$squared(dTheta);
      var dThetaSquared = _v0.a;
      var kx = A2($ianmackenzie$elm_units$Quantity$multiplyBy, dThetaSquared, rx);
      var ky = A2($ianmackenzie$elm_units$Quantity$multiplyBy, dThetaSquared, ry);
      if (A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, ky, kx) && includeKx) {
          return kx;
      } else {
          if (A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, kx, ky) && includeKy) {
              return ky;
          } else {
              var sinTheta1 = $ianmackenzie$elm_units$Angle$sin(theta1);
              var sinTheta0 = $ianmackenzie$elm_units$Angle$sin(theta0);
              var rySquared = $ianmackenzie$elm_units$Quantity$squared(ry);
              var rxSquared = $ianmackenzie$elm_units$Quantity$squared(rx);
              var cosTheta1 = $ianmackenzie$elm_units$Angle$cos(theta1);
              var d1 = A2(
                  $ianmackenzie$elm_units$Quantity$plus,
                  A2($ianmackenzie$elm_units$Quantity$multiplyBy, sinTheta1 * sinTheta1, rySquared),
                  A2($ianmackenzie$elm_units$Quantity$multiplyBy, cosTheta1 * cosTheta1, rxSquared));
              var cosTheta0 = $ianmackenzie$elm_units$Angle$cos(theta0);
              var d0 = A2(
                  $ianmackenzie$elm_units$Quantity$plus,
                  A2($ianmackenzie$elm_units$Quantity$multiplyBy, sinTheta0 * sinTheta0, rySquared),
                  A2($ianmackenzie$elm_units$Quantity$multiplyBy, cosTheta0 * cosTheta0, rxSquared));
              return A2(
                  $ianmackenzie$elm_units$Quantity$multiplyBy,
                  dThetaSquared,
                  $ianmackenzie$elm_units$Quantity$sqrt(
                      A2($ianmackenzie$elm_units$Quantity$max, d0, d1)));
          }
      }
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$arcLengthParameterized = F2(
      function (_v0, nondegenerateArc) {
          var maxError = _v0.maxError;
          var arc = $ianmackenzie$elm_geometry$EllipticalArc2d$fromNondegenerate(nondegenerateArc);
          var parameterization = $ianmackenzie$elm_geometry$ArcLengthParameterization$build(
              {
                  derivativeMagnitude: $ianmackenzie$elm_geometry$EllipticalArc2d$derivativeMagnitude(arc),
                  maxError: maxError,
                  maxSecondDerivativeMagnitude: $ianmackenzie$elm_geometry$EllipticalArc2d$maxSecondDerivativeMagnitude(arc)
              });
          return $ianmackenzie$elm_geometry$EllipticalArc2d$ArcLengthParameterized(
              {nondegenerateArc: nondegenerateArc, parameterization: parameterization, underlyingArc: arc});
      });
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$ArcLengthParameterized = function (a) {
      return {$: 'ArcLengthParameterized', a: a};
  };
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$derivativeMagnitude = function (_v0) {
      var spline = _v0.a;
      var _v1 = spline.thirdControlPoint;
      var p3 = _v1.a;
      var x3 = p3.x;
      var y3 = p3.y;
      var _v2 = spline.secondControlPoint;
      var p2 = _v2.a;
      var x2 = p2.x;
      var x23 = x3 - x2;
      var y2 = p2.y;
      var y23 = y3 - y2;
      var _v3 = spline.firstControlPoint;
      var p1 = _v3.a;
      var x1 = p1.x;
      var x12 = x2 - x1;
      var x123 = x23 - x12;
      var y1 = p1.y;
      var y12 = y2 - y1;
      var y123 = y23 - y12;
      return function (parameterValue) {
          var y13 = y12 + (parameterValue * y123);
          var x13 = x12 + (parameterValue * x123);
          return $ianmackenzie$elm_units$Quantity$Quantity(
              2 * $elm$core$Basics$sqrt((x13 * x13) + (y13 * y13)));
      };
  };
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$fromNondegenerate = function (nondegenerateSpline) {
      if (nondegenerateSpline.$ === 'NonZeroSecondDerivative') {
          var spline = nondegenerateSpline.a;
          return spline;
      } else {
          var spline = nondegenerateSpline.a;
          return spline;
      }
  };
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$firstControlPoint = function (_v0) {
      var spline = _v0.a;
      return spline.firstControlPoint;
  };
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$secondControlPoint = function (_v0) {
      var spline = _v0.a;
      return spline.secondControlPoint;
  };
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$thirdControlPoint = function (_v0) {
      var spline = _v0.a;
      return spline.thirdControlPoint;
  };
  var $ianmackenzie$elm_geometry$Vector2d$scaleBy = F2(
      function (k, _v0) {
          var v = _v0.a;
          return $ianmackenzie$elm_geometry$Geometry$Types$Vector2d(
              {x: k * v.x, y: k * v.y});
      });
  var $ianmackenzie$elm_geometry$Vector2d$twice = function (vector) {
      return A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, 2, vector);
  };
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$secondDerivative = function (spline) {
      var p3 = $ianmackenzie$elm_geometry$QuadraticSpline2d$thirdControlPoint(spline);
      var p2 = $ianmackenzie$elm_geometry$QuadraticSpline2d$secondControlPoint(spline);
      var v2 = A2($ianmackenzie$elm_geometry$Vector2d$from, p2, p3);
      var p1 = $ianmackenzie$elm_geometry$QuadraticSpline2d$firstControlPoint(spline);
      var v1 = A2($ianmackenzie$elm_geometry$Vector2d$from, p1, p2);
      return $ianmackenzie$elm_geometry$Vector2d$twice(
          A2($ianmackenzie$elm_geometry$Vector2d$minus, v1, v2));
  };
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$arcLengthParameterized = F2(
      function (_v0, nondegenerateSpline) {
          var maxError = _v0.maxError;
          var spline = $ianmackenzie$elm_geometry$QuadraticSpline2d$fromNondegenerate(nondegenerateSpline);
          var parameterization = $ianmackenzie$elm_geometry$ArcLengthParameterization$build(
              {
                  derivativeMagnitude: $ianmackenzie$elm_geometry$QuadraticSpline2d$derivativeMagnitude(spline),
                  maxError: maxError,
                  maxSecondDerivativeMagnitude: $ianmackenzie$elm_geometry$Vector2d$length(
                      $ianmackenzie$elm_geometry$QuadraticSpline2d$secondDerivative(spline))
              });
          return $ianmackenzie$elm_geometry$QuadraticSpline2d$ArcLengthParameterized(
              {nondegenerateSpline: nondegenerateSpline, parameterization: parameterization, underlyingSpline: spline});
      });
  var $ianmackenzie$elm_geometry$CubicSpline2d$NonZeroFirstDerivative = F2(
      function (a, b) {
          return {$: 'NonZeroFirstDerivative', a: a, b: b};
      });
  var $ianmackenzie$elm_geometry$CubicSpline2d$NonZeroSecondDerivative = F2(
      function (a, b) {
          return {$: 'NonZeroSecondDerivative', a: a, b: b};
      });
  var $ianmackenzie$elm_geometry$CubicSpline2d$NonZeroThirdDerivative = F2(
      function (a, b) {
          return {$: 'NonZeroThirdDerivative', a: a, b: b};
      });
  var $ianmackenzie$elm_geometry$Geometry$Types$Direction2d = function (a) {
      return {$: 'Direction2d', a: a};
  };
  var $ianmackenzie$elm_geometry$Vector2d$direction = function (_v0) {
      var v = _v0.a;
      var largestComponent = A2(
          $elm$core$Basics$max,
          $elm$core$Basics$abs(v.x),
          $elm$core$Basics$abs(v.y));
      if (!largestComponent) {
          return $elm$core$Maybe$Nothing;
      } else {
          var scaledY = v.y / largestComponent;
          var scaledX = v.x / largestComponent;
          var scaledLength = $elm$core$Basics$sqrt((scaledX * scaledX) + (scaledY * scaledY));
          return $elm$core$Maybe$Just(
              $ianmackenzie$elm_geometry$Geometry$Types$Direction2d(
                  {x: scaledX / scaledLength, y: scaledY / scaledLength}));
      }
  };
  var $ianmackenzie$elm_units$Quantity$interpolateFrom = F3(
      function (_v0, _v1, parameter) {
          var start = _v0.a;
          var end = _v1.a;
          return (parameter <= 0.5) ? $ianmackenzie$elm_units$Quantity$Quantity(start + (parameter * (end - start))) : $ianmackenzie$elm_units$Quantity$Quantity(end + ((1 - parameter) * (start - end)));
      });
  var $ianmackenzie$elm_units$Quantity$minus = F2(
      function (_v0, _v1) {
          var y = _v0.a;
          var x = _v1.a;
          return $ianmackenzie$elm_units$Quantity$Quantity(x - y);
      });
  var $ianmackenzie$elm_geometry$Point2d$xCoordinate = function (_v0) {
      var p = _v0.a;
      return $ianmackenzie$elm_units$Quantity$Quantity(p.x);
  };
  var $ianmackenzie$elm_geometry$Vector2d$xy = F2(
      function (_v0, _v1) {
          var x = _v0.a;
          var y = _v1.a;
          return $ianmackenzie$elm_geometry$Geometry$Types$Vector2d(
              {x: x, y: y});
      });
  var $ianmackenzie$elm_geometry$Point2d$yCoordinate = function (_v0) {
      var p = _v0.a;
      return $ianmackenzie$elm_units$Quantity$Quantity(p.y);
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$firstDerivative = F2(
      function (spline, parameterValue) {
          var p4 = $ianmackenzie$elm_geometry$CubicSpline2d$fourthControlPoint(spline);
          var x4 = $ianmackenzie$elm_geometry$Point2d$xCoordinate(p4);
          var y4 = $ianmackenzie$elm_geometry$Point2d$yCoordinate(p4);
          var p3 = $ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint(spline);
          var x3 = $ianmackenzie$elm_geometry$Point2d$xCoordinate(p3);
          var vx3 = A2($ianmackenzie$elm_units$Quantity$minus, x3, x4);
          var y3 = $ianmackenzie$elm_geometry$Point2d$yCoordinate(p3);
          var vy3 = A2($ianmackenzie$elm_units$Quantity$minus, y3, y4);
          var p2 = $ianmackenzie$elm_geometry$CubicSpline2d$secondControlPoint(spline);
          var x2 = $ianmackenzie$elm_geometry$Point2d$xCoordinate(p2);
          var vx2 = A2($ianmackenzie$elm_units$Quantity$minus, x2, x3);
          var wx2 = A3($ianmackenzie$elm_units$Quantity$interpolateFrom, vx2, vx3, parameterValue);
          var y2 = $ianmackenzie$elm_geometry$Point2d$yCoordinate(p2);
          var vy2 = A2($ianmackenzie$elm_units$Quantity$minus, y2, y3);
          var wy2 = A3($ianmackenzie$elm_units$Quantity$interpolateFrom, vy2, vy3, parameterValue);
          var p1 = $ianmackenzie$elm_geometry$CubicSpline2d$firstControlPoint(spline);
          var x1 = $ianmackenzie$elm_geometry$Point2d$xCoordinate(p1);
          var vx1 = A2($ianmackenzie$elm_units$Quantity$minus, x1, x2);
          var wx1 = A3($ianmackenzie$elm_units$Quantity$interpolateFrom, vx1, vx2, parameterValue);
          var y1 = $ianmackenzie$elm_geometry$Point2d$yCoordinate(p1);
          var vy1 = A2($ianmackenzie$elm_units$Quantity$minus, y1, y2);
          var wy1 = A3($ianmackenzie$elm_units$Quantity$interpolateFrom, vy1, vy2, parameterValue);
          return A2(
              $ianmackenzie$elm_geometry$Vector2d$xy,
              A2(
                  $ianmackenzie$elm_units$Quantity$multiplyBy,
                  3,
                  A3($ianmackenzie$elm_units$Quantity$interpolateFrom, wx1, wx2, parameterValue)),
              A2(
                  $ianmackenzie$elm_units$Quantity$multiplyBy,
                  3,
                  A3($ianmackenzie$elm_units$Quantity$interpolateFrom, wy1, wy2, parameterValue)));
      });
  var $ianmackenzie$elm_geometry$Vector2d$interpolateFrom = F3(
      function (_v0, _v1, t) {
          var v1 = _v0.a;
          var v2 = _v1.a;
          return (t <= 0.5) ? $ianmackenzie$elm_geometry$Geometry$Types$Vector2d(
              {x: v1.x + (t * (v2.x - v1.x)), y: v1.y + (t * (v2.y - v1.y))}) : $ianmackenzie$elm_geometry$Geometry$Types$Vector2d(
              {x: v2.x + ((1 - t) * (v1.x - v2.x)), y: v2.y + ((1 - t) * (v1.y - v2.y))});
      });
  var $ianmackenzie$elm_geometry$CubicSpline2d$secondDerivative = F2(
      function (spline, parameterValue) {
          var p4 = $ianmackenzie$elm_geometry$CubicSpline2d$fourthControlPoint(spline);
          var p3 = $ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint(spline);
          var u3 = A2($ianmackenzie$elm_geometry$Vector2d$from, p3, p4);
          var p2 = $ianmackenzie$elm_geometry$CubicSpline2d$secondControlPoint(spline);
          var u2 = A2($ianmackenzie$elm_geometry$Vector2d$from, p2, p3);
          var v2 = A2($ianmackenzie$elm_geometry$Vector2d$minus, u2, u3);
          var p1 = $ianmackenzie$elm_geometry$CubicSpline2d$firstControlPoint(spline);
          var u1 = A2($ianmackenzie$elm_geometry$Vector2d$from, p1, p2);
          var v1 = A2($ianmackenzie$elm_geometry$Vector2d$minus, u1, u2);
          return A2(
              $ianmackenzie$elm_geometry$Vector2d$scaleBy,
              6,
              A3($ianmackenzie$elm_geometry$Vector2d$interpolateFrom, v1, v2, parameterValue));
      });
  var $ianmackenzie$elm_geometry$CubicSpline2d$startPoint = function (_v0) {
      var spline = _v0.a;
      return spline.firstControlPoint;
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$thirdDerivative = function (spline) {
      var p4 = $ianmackenzie$elm_geometry$CubicSpline2d$fourthControlPoint(spline);
      var p3 = $ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint(spline);
      var u3 = A2($ianmackenzie$elm_geometry$Vector2d$from, p3, p4);
      var p2 = $ianmackenzie$elm_geometry$CubicSpline2d$secondControlPoint(spline);
      var u2 = A2($ianmackenzie$elm_geometry$Vector2d$from, p2, p3);
      var v2 = A2($ianmackenzie$elm_geometry$Vector2d$minus, u2, u3);
      var p1 = $ianmackenzie$elm_geometry$CubicSpline2d$firstControlPoint(spline);
      var u1 = A2($ianmackenzie$elm_geometry$Vector2d$from, p1, p2);
      var v1 = A2($ianmackenzie$elm_geometry$Vector2d$minus, u1, u2);
      return A2(
          $ianmackenzie$elm_geometry$Vector2d$scaleBy,
          6,
          A2($ianmackenzie$elm_geometry$Vector2d$minus, v1, v2));
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$nondegenerate = function (spline) {
      var _v0 = $ianmackenzie$elm_geometry$Vector2d$direction(
          $ianmackenzie$elm_geometry$CubicSpline2d$thirdDerivative(spline));
      if (_v0.$ === 'Just') {
          var direction = _v0.a;
          return $elm$core$Result$Ok(
              A2($ianmackenzie$elm_geometry$CubicSpline2d$NonZeroThirdDerivative, spline, direction));
      } else {
          var secondDerivativeVector = A2($ianmackenzie$elm_geometry$CubicSpline2d$secondDerivative, spline, 0);
          var _v1 = $ianmackenzie$elm_geometry$Vector2d$direction(secondDerivativeVector);
          if (_v1.$ === 'Just') {
              var direction = _v1.a;
              return $elm$core$Result$Ok(
                  A2($ianmackenzie$elm_geometry$CubicSpline2d$NonZeroSecondDerivative, spline, direction));
          } else {
              var firstDerivativeVector = A2($ianmackenzie$elm_geometry$CubicSpline2d$firstDerivative, spline, 0);
              var _v2 = $ianmackenzie$elm_geometry$Vector2d$direction(firstDerivativeVector);
              if (_v2.$ === 'Just') {
                  var direction = _v2.a;
                  return $elm$core$Result$Ok(
                      A2($ianmackenzie$elm_geometry$CubicSpline2d$NonZeroFirstDerivative, spline, direction));
              } else {
                  return $elm$core$Result$Err(
                      $ianmackenzie$elm_geometry$CubicSpline2d$startPoint(spline));
              }
          }
      }
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$Curved = function (a) {
      return {$: 'Curved', a: a};
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$Horizontal = function (a) {
      return {$: 'Horizontal', a: a};
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$Vertical = function (a) {
      return {$: 'Vertical', a: a};
  };
  var $ianmackenzie$elm_geometry$Geometry$Types$Frame2d = function (a) {
      return {$: 'Frame2d', a: a};
  };
  var $ianmackenzie$elm_geometry$Frame2d$copy = function (_v0) {
      var properties = _v0.a;
      return $ianmackenzie$elm_geometry$Geometry$Types$Frame2d(properties);
  };
  var $ianmackenzie$elm_geometry$Ellipse2d$axes = function (_v0) {
      var ellipse = _v0.a;
      return $ianmackenzie$elm_geometry$Frame2d$copy(ellipse.axes);
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$axes = function (_v0) {
      var arc = _v0.a;
      return $ianmackenzie$elm_geometry$Ellipse2d$axes(arc.ellipse);
  };
  var $ianmackenzie$elm_geometry$Geometry$Types$Point2d = function (a) {
      return {$: 'Point2d', a: a};
  };
  var $ianmackenzie$elm_geometry$Point2d$xyIn = F3(
      function (_v0, _v1, _v2) {
          var frame = _v0.a;
          var x = _v1.a;
          var y = _v2.a;
          var _v3 = frame.originPoint;
          var p0 = _v3.a;
          var _v4 = frame.yDirection;
          var j = _v4.a;
          var _v5 = frame.xDirection;
          var i = _v5.a;
          return $ianmackenzie$elm_geometry$Geometry$Types$Point2d(
              {x: (p0.x + (x * i.x)) + (y * j.x), y: (p0.y + (x * i.y)) + (y * j.y)});
      });
  var $ianmackenzie$elm_geometry$EllipticalArc2d$pointOn = F2(
      function (arc, parameterValue) {
          var theta = A2(
              $ianmackenzie$elm_units$Quantity$plus,
              A2(
                  $ianmackenzie$elm_units$Quantity$multiplyBy,
                  parameterValue,
                  $ianmackenzie$elm_geometry$EllipticalArc2d$sweptAngle(arc)),
              $ianmackenzie$elm_geometry$EllipticalArc2d$startAngle(arc));
          var localY = A2(
              $ianmackenzie$elm_geometry$Quantity$Extra$rSinTheta,
              $ianmackenzie$elm_geometry$EllipticalArc2d$yRadius(arc),
              theta);
          var localX = A2(
              $ianmackenzie$elm_geometry$Quantity$Extra$rCosTheta,
              $ianmackenzie$elm_geometry$EllipticalArc2d$xRadius(arc),
              theta);
          return A3(
              $ianmackenzie$elm_geometry$Point2d$xyIn,
              $ianmackenzie$elm_geometry$EllipticalArc2d$axes(arc),
              localX,
              localY);
      });
  var $ianmackenzie$elm_geometry$EllipticalArc2d$startPoint = function (arc) {
      return A2($ianmackenzie$elm_geometry$EllipticalArc2d$pointOn, arc, 0);
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$nondegenerate = function (arc) {
      var ry = $ianmackenzie$elm_geometry$EllipticalArc2d$yRadius(arc);
      var rx = $ianmackenzie$elm_geometry$EllipticalArc2d$xRadius(arc);
      return _Utils_eq(
          $ianmackenzie$elm_geometry$EllipticalArc2d$sweptAngle(arc),
          $ianmackenzie$elm_units$Quantity$zero) ? $elm$core$Result$Err(
          $ianmackenzie$elm_geometry$EllipticalArc2d$startPoint(arc)) : ((_Utils_eq(rx, $ianmackenzie$elm_units$Quantity$zero) && _Utils_eq(ry, $ianmackenzie$elm_units$Quantity$zero)) ? $elm$core$Result$Err(
          $ianmackenzie$elm_geometry$EllipticalArc2d$startPoint(arc)) : (_Utils_eq(rx, $ianmackenzie$elm_units$Quantity$zero) ? $elm$core$Result$Ok(
          $ianmackenzie$elm_geometry$EllipticalArc2d$Vertical(arc)) : (_Utils_eq(ry, $ianmackenzie$elm_units$Quantity$zero) ? $elm$core$Result$Ok(
          $ianmackenzie$elm_geometry$EllipticalArc2d$Horizontal(arc)) : $elm$core$Result$Ok(
          $ianmackenzie$elm_geometry$EllipticalArc2d$Curved(arc)))));
  };
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$NonZeroFirstDerivative = F2(
      function (a, b) {
          return {$: 'NonZeroFirstDerivative', a: a, b: b};
      });
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$NonZeroSecondDerivative = F2(
      function (a, b) {
          return {$: 'NonZeroSecondDerivative', a: a, b: b};
      });
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$firstDerivative = F2(
      function (spline, parameterValue) {
          var p3 = $ianmackenzie$elm_geometry$QuadraticSpline2d$thirdControlPoint(spline);
          var p2 = $ianmackenzie$elm_geometry$QuadraticSpline2d$secondControlPoint(spline);
          var v2 = A2($ianmackenzie$elm_geometry$Vector2d$from, p2, p3);
          var p1 = $ianmackenzie$elm_geometry$QuadraticSpline2d$firstControlPoint(spline);
          var v1 = A2($ianmackenzie$elm_geometry$Vector2d$from, p1, p2);
          return $ianmackenzie$elm_geometry$Vector2d$twice(
              A3($ianmackenzie$elm_geometry$Vector2d$interpolateFrom, v1, v2, parameterValue));
      });
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$startPoint = function (_v0) {
      var spline = _v0.a;
      return spline.firstControlPoint;
  };
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$nondegenerate = function (spline) {
      var _v0 = $ianmackenzie$elm_geometry$Vector2d$direction(
          $ianmackenzie$elm_geometry$QuadraticSpline2d$secondDerivative(spline));
      if (_v0.$ === 'Just') {
          var direction = _v0.a;
          return $elm$core$Result$Ok(
              A2($ianmackenzie$elm_geometry$QuadraticSpline2d$NonZeroSecondDerivative, spline, direction));
      } else {
          var firstDerivativeVector = A2($ianmackenzie$elm_geometry$QuadraticSpline2d$firstDerivative, spline, 0);
          var _v1 = $ianmackenzie$elm_geometry$Vector2d$direction(firstDerivativeVector);
          if (_v1.$ === 'Just') {
              var direction = _v1.a;
              return $elm$core$Result$Ok(
                  A2($ianmackenzie$elm_geometry$QuadraticSpline2d$NonZeroFirstDerivative, spline, direction));
          } else {
              return $elm$core$Result$Err(
                  $ianmackenzie$elm_geometry$QuadraticSpline2d$startPoint(spline));
          }
      }
  };
  var $elm$core$Result$toMaybe = function (result) {
      if (result.$ === 'Ok') {
          var v = result.a;
          return $elm$core$Maybe$Just(v);
      } else {
          return $elm$core$Maybe$Nothing;
      }
  };
  var $folkertdev$one_true_path_experiment$Segment$arcLengthParameterized = F2(
      function (tolerance, segment) {
          var config = {
              maxError: $ianmackenzie$elm_units$Quantity$float(tolerance)
          };
          switch (segment.$) {
              case 'LineSegment':
                  var lineSegment = segment.a;
                  return $elm$core$Maybe$Just(
                      $folkertdev$one_true_path_experiment$Segment$ParameterizedLineSegment(lineSegment));
              case 'Quadratic':
                  var spline = segment.a;
                  return A2(
                      $elm$core$Maybe$map,
                      A2(
                          $elm$core$Basics$composeR,
                          $ianmackenzie$elm_geometry$QuadraticSpline2d$arcLengthParameterized(config),
                          $folkertdev$one_true_path_experiment$Segment$ParameterizedQuadratic),
                      $elm$core$Result$toMaybe(
                          $ianmackenzie$elm_geometry$QuadraticSpline2d$nondegenerate(spline)));
              case 'Cubic':
                  var spline = segment.a;
                  return A2(
                      $elm$core$Maybe$map,
                      A2(
                          $elm$core$Basics$composeR,
                          $ianmackenzie$elm_geometry$CubicSpline2d$arcLengthParameterized(config),
                          $folkertdev$one_true_path_experiment$Segment$ParameterizedCubic),
                      $elm$core$Result$toMaybe(
                          $ianmackenzie$elm_geometry$CubicSpline2d$nondegenerate(spline)));
              default:
                  var arc = segment.a;
                  return A2(
                      $elm$core$Maybe$map,
                      A2(
                          $elm$core$Basics$composeR,
                          $ianmackenzie$elm_geometry$EllipticalArc2d$arcLengthParameterized(config),
                          $folkertdev$one_true_path_experiment$Segment$ParameterizedArc),
                      $elm$core$Result$toMaybe(
                          $ianmackenzie$elm_geometry$EllipticalArc2d$nondegenerate(arc)));
          }
      });
  var $elm$core$List$drop = F2(
      function (n, list) {
          drop:
          while (true) {
              if (n <= 0) {
                  return list;
              } else {
                  if (!list.b) {
                      return list;
                  } else {
                      var x = list.a;
                      var xs = list.b;
                      var $temp$n = n - 1,
                          $temp$list = xs;
                      n = $temp$n;
                      list = $temp$list;
                      continue drop;
                  }
              }
          }
      });
  var $elm$core$List$takeReverse = F3(
      function (n, list, kept) {
          takeReverse:
          while (true) {
              if (n <= 0) {
                  return kept;
              } else {
                  if (!list.b) {
                      return kept;
                  } else {
                      var x = list.a;
                      var xs = list.b;
                      var $temp$n = n - 1,
                          $temp$list = xs,
                          $temp$kept = A2($elm$core$List$cons, x, kept);
                      n = $temp$n;
                      list = $temp$list;
                      kept = $temp$kept;
                      continue takeReverse;
                  }
              }
          }
      });
  var $elm$core$List$takeTailRec = F2(
      function (n, list) {
          return $elm$core$List$reverse(
              A3($elm$core$List$takeReverse, n, list, _List_Nil));
      });
  var $elm$core$List$takeFast = F3(
      function (ctr, n, list) {
          if (n <= 0) {
              return _List_Nil;
          } else {
              var _v0 = _Utils_Tuple2(n, list);
              _v0$1:
              while (true) {
                  _v0$5:
                  while (true) {
                      if (!_v0.b.b) {
                          return list;
                      } else {
                          if (_v0.b.b.b) {
                              switch (_v0.a) {
                                  case 1:
                                      break _v0$1;
                                  case 2:
                                      var _v2 = _v0.b;
                                      var x = _v2.a;
                                      var _v3 = _v2.b;
                                      var y = _v3.a;
                                      return _List_fromArray(
                                          [x, y]);
                                  case 3:
                                      if (_v0.b.b.b.b) {
                                          var _v4 = _v0.b;
                                          var x = _v4.a;
                                          var _v5 = _v4.b;
                                          var y = _v5.a;
                                          var _v6 = _v5.b;
                                          var z = _v6.a;
                                          return _List_fromArray(
                                              [x, y, z]);
                                      } else {
                                          break _v0$5;
                                      }
                                  default:
                                      if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
                                          var _v7 = _v0.b;
                                          var x = _v7.a;
                                          var _v8 = _v7.b;
                                          var y = _v8.a;
                                          var _v9 = _v8.b;
                                          var z = _v9.a;
                                          var _v10 = _v9.b;
                                          var w = _v10.a;
                                          var tl = _v10.b;
                                          return (ctr > 1000) ? A2(
                                              $elm$core$List$cons,
                                              x,
                                              A2(
                                                  $elm$core$List$cons,
                                                  y,
                                                  A2(
                                                      $elm$core$List$cons,
                                                      z,
                                                      A2(
                                                          $elm$core$List$cons,
                                                          w,
                                                          A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
                                              $elm$core$List$cons,
                                              x,
                                              A2(
                                                  $elm$core$List$cons,
                                                  y,
                                                  A2(
                                                      $elm$core$List$cons,
                                                      z,
                                                      A2(
                                                          $elm$core$List$cons,
                                                          w,
                                                          A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
                                      } else {
                                          break _v0$5;
                                      }
                              }
                          } else {
                              if (_v0.a === 1) {
                                  break _v0$1;
                              } else {
                                  break _v0$5;
                              }
                          }
                      }
                  }
                  return list;
              }
              var _v1 = _v0.b;
              var x = _v1.a;
              return _List_fromArray(
                  [x]);
          }
      });
  var $elm$core$List$take = F2(
      function (n, list) {
          return A3($elm$core$List$takeFast, 0, n, list);
      });
  var $elm_community$list_extra$List$Extra$splitAt = F2(
      function (n, xs) {
          return _Utils_Tuple2(
              A2($elm$core$List$take, n, xs),
              A2($elm$core$List$drop, n, xs));
      });
  var $folkertdev$one_true_path_experiment$SubPath$arcLengthParameterizedHelper = F2(
      function (tolerance, segments) {
          if (!segments.b) {
              return $folkertdev$one_true_path_experiment$SubPath$None;
          } else {
              if (!segments.b.b) {
                  var segment = segments.a;
                  var _v1 = A2($folkertdev$one_true_path_experiment$Segment$arcLengthParameterized, tolerance, segment);
                  if (_v1.$ === 'Nothing') {
                      return $folkertdev$one_true_path_experiment$SubPath$None;
                  } else {
                      var parameterized = _v1.a;
                      return $folkertdev$one_true_path_experiment$SubPath$Leaf(
                          {segment: parameterized, tolerance: tolerance});
                  }
              } else {
                  var _v2 = A2(
                      $elm_community$list_extra$List$Extra$splitAt,
                      $elm$core$Basics$ceiling(
                          $elm$core$List$length(segments) / 2),
                      segments);
                  var leftSegments = _v2.a;
                  var rightSegments = _v2.b;
                  var leftParameterized = A2($folkertdev$one_true_path_experiment$SubPath$arcLengthParameterizedHelper, tolerance, leftSegments);
                  var rightParameterized = A2($folkertdev$one_true_path_experiment$SubPath$arcLengthParameterizedHelper, tolerance, rightSegments);
                  if (rightParameterized.$ === 'None') {
                      return leftParameterized;
                  } else {
                      return $folkertdev$one_true_path_experiment$SubPath$Node(
                          {
                              left: leftParameterized,
                              lengthAtSplit: $folkertdev$one_true_path_experiment$SubPath$arcLength(leftParameterized),
                              right: rightParameterized,
                              tolerance: tolerance,
                              totalLength: $folkertdev$one_true_path_experiment$SubPath$arcLength(leftParameterized) + $folkertdev$one_true_path_experiment$SubPath$arcLength(rightParameterized)
                          });
                  }
              }
          }
      });
  var $elm_community$list_extra$List$Extra$last = function (items) {
      last:
      while (true) {
          if (!items.b) {
              return $elm$core$Maybe$Nothing;
          } else {
              if (!items.b.b) {
                  var x = items.a;
                  return $elm$core$Maybe$Just(x);
              } else {
                  var rest = items.b;
                  var $temp$items = rest;
                  items = $temp$items;
                  continue last;
              }
          }
      }
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$endPoint = function (_v0) {
      var spline = _v0.a;
      return spline.fourthControlPoint;
  };
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$endPoint = function (_v0) {
      var spline = _v0.a;
      return spline.thirdControlPoint;
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$endPoint = function (arc) {
      return A2($ianmackenzie$elm_geometry$EllipticalArc2d$pointOn, arc, 1);
  };
  var $ianmackenzie$elm_geometry$LineSegment2d$endPoint = function (_v0) {
      var _v1 = _v0.a;
      var end = _v1.b;
      return end;
  };
  var $ianmackenzie$elm_geometry$Point2d$toTuple = F2(
      function (fromQuantity, point) {
          return _Utils_Tuple2(
              fromQuantity(
                  $ianmackenzie$elm_geometry$Point2d$xCoordinate(point)),
              fromQuantity(
                  $ianmackenzie$elm_geometry$Point2d$yCoordinate(point)));
      });
  var $folkertdev$one_true_path_experiment$Segment$finalPoint = function (segment) {
      return A2(
          $ianmackenzie$elm_geometry$Point2d$toTuple,
          $ianmackenzie$elm_units$Quantity$toFloat,
          function () {
              switch (segment.$) {
                  case 'LineSegment':
                      var lineSegment = segment.a;
                      return $ianmackenzie$elm_geometry$LineSegment2d$endPoint(lineSegment);
                  case 'Quadratic':
                      var spline = segment.a;
                      return $ianmackenzie$elm_geometry$QuadraticSpline2d$endPoint(spline);
                  case 'Cubic':
                      var spline = segment.a;
                      return $ianmackenzie$elm_geometry$CubicSpline2d$endPoint(spline);
                  default:
                      var arc = segment.a;
                      return $ianmackenzie$elm_geometry$EllipticalArc2d$endPoint(arc);
              }
          }());
  };
  var $ianmackenzie$elm_geometry$LineSegment2d$startPoint = function (_v0) {
      var _v1 = _v0.a;
      var start = _v1.a;
      return start;
  };
  var $folkertdev$one_true_path_experiment$Segment$firstPoint = function (segment) {
      return A2(
          $ianmackenzie$elm_geometry$Point2d$toTuple,
          $ianmackenzie$elm_units$Quantity$toFloat,
          function () {
              switch (segment.$) {
                  case 'LineSegment':
                      var lineSegment = segment.a;
                      return $ianmackenzie$elm_geometry$LineSegment2d$startPoint(lineSegment);
                  case 'Quadratic':
                      var spline = segment.a;
                      return $ianmackenzie$elm_geometry$QuadraticSpline2d$startPoint(spline);
                  case 'Cubic':
                      var spline = segment.a;
                      return $ianmackenzie$elm_geometry$CubicSpline2d$startPoint(spline);
                  default:
                      var arc = segment.a;
                      return $ianmackenzie$elm_geometry$EllipticalArc2d$startPoint(arc);
              }
          }());
  };
  var $folkertdev$one_true_path_experiment$Segment$toCursorState = function (segment) {
      switch (segment.$) {
          case 'Cubic':
              var curve = segment.a;
              var start = A2(
                  $ianmackenzie$elm_geometry$Point2d$toTuple,
                  $ianmackenzie$elm_units$Quantity$toFloat,
                  $ianmackenzie$elm_geometry$CubicSpline2d$startPoint(curve));
              var end = A2(
                  $ianmackenzie$elm_geometry$Point2d$toTuple,
                  $ianmackenzie$elm_units$Quantity$toFloat,
                  $ianmackenzie$elm_geometry$CubicSpline2d$endPoint(curve));
              var control = A2(
                  $ianmackenzie$elm_geometry$Point2d$toTuple,
                  $ianmackenzie$elm_units$Quantity$toFloat,
                  $ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint(curve));
              return {
                  cursor: end,
                  previousControlPoint: $elm$core$Maybe$Just(control),
                  start: start
              };
          case 'Quadratic':
              var curve = segment.a;
              var start = A2(
                  $ianmackenzie$elm_geometry$Point2d$toTuple,
                  $ianmackenzie$elm_units$Quantity$toFloat,
                  $ianmackenzie$elm_geometry$QuadraticSpline2d$startPoint(curve));
              var end = A2(
                  $ianmackenzie$elm_geometry$Point2d$toTuple,
                  $ianmackenzie$elm_units$Quantity$toFloat,
                  $ianmackenzie$elm_geometry$QuadraticSpline2d$endPoint(curve));
              var control = A2(
                  $ianmackenzie$elm_geometry$Point2d$toTuple,
                  $ianmackenzie$elm_units$Quantity$toFloat,
                  $ianmackenzie$elm_geometry$QuadraticSpline2d$secondControlPoint(curve));
              return {
                  cursor: end,
                  previousControlPoint: $elm$core$Maybe$Just(control),
                  start: start
              };
          default:
              return {
                  cursor: $folkertdev$one_true_path_experiment$Segment$finalPoint(segment),
                  previousControlPoint: $elm$core$Maybe$Nothing,
                  start: $folkertdev$one_true_path_experiment$Segment$firstPoint(segment)
              };
      }
  };
  var $elm$core$Basics$composeL = F3(
      function (g, f, x) {
          return g(
              f(x));
      });
  var $folkertdev$elm_deque$Internal$toList = function (deque) {
      return _Utils_ap(
          deque.front,
          $elm$core$List$reverse(deque.rear));
  };
  var $folkertdev$elm_deque$Deque$unwrap = function (_v0) {
      var boundedDeque = _v0.a;
      return boundedDeque;
  };
  var $folkertdev$elm_deque$Deque$toList = A2($elm$core$Basics$composeL, $folkertdev$elm_deque$Internal$toList, $folkertdev$elm_deque$Deque$unwrap);
  var $folkertdev$one_true_path_experiment$Segment$Cubic = function (a) {
      return {$: 'Cubic', a: a};
  };
  var $folkertdev$one_true_path_experiment$Segment$LineSegment = function (a) {
      return {$: 'LineSegment', a: a};
  };
  var $folkertdev$one_true_path_experiment$Segment$Quadratic = function (a) {
      return {$: 'Quadratic', a: a};
  };
  var $folkertdev$one_true_path_experiment$Segment$Arc = function (a) {
      return {$: 'Arc', a: a};
  };
  var $folkertdev$one_true_path_experiment$Geometry$Ellipse$conversionMatrix = function (xAxisRotate) {
      return _Utils_Tuple2(
          _Utils_Tuple2(
              $elm$core$Basics$cos(xAxisRotate),
              (-1) * $elm$core$Basics$sin(xAxisRotate)),
          _Utils_Tuple2(
              $elm$core$Basics$sin(xAxisRotate),
              $elm$core$Basics$cos(xAxisRotate)));
  };
  var $ianmackenzie$elm_geometry$Vector2d$fromTuple = F2(
      function (toQuantity, _v0) {
          var x = _v0.a;
          var y = _v0.b;
          return A2(
              $ianmackenzie$elm_geometry$Vector2d$xy,
              toQuantity(x),
              toQuantity(y));
      });
  var $folkertdev$one_true_path_experiment$Geometry$Ellipse$inverseConversionMatrix = function (xAxisRotate) {
      return _Utils_Tuple2(
          _Utils_Tuple2(
              $elm$core$Basics$cos(xAxisRotate),
              $elm$core$Basics$sin(xAxisRotate)),
          _Utils_Tuple2(
              (-1) * $elm$core$Basics$sin(xAxisRotate),
              $elm$core$Basics$cos(xAxisRotate)));
  };
  var $ianmackenzie$elm_geometry$Vector2d$dot = F2(
      function (_v0, _v1) {
          var v2 = _v0.a;
          var v1 = _v1.a;
          return $ianmackenzie$elm_units$Quantity$Quantity((v1.x * v2.x) + (v1.y * v2.y));
      });
  var $folkertdev$one_true_path_experiment$Geometry$Ellipse$matrixMulVector = F2(
      function (_v0, vec) {
          var ab = _v0.a;
          var cd = _v0.b;
          var vector = A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, vec);
          var row2 = A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, cd);
          var row1 = A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, ab);
          var _v1 = A2($ianmackenzie$elm_geometry$Vector2d$dot, row2, vector);
          var dot2 = _v1.a;
          var _v2 = A2($ianmackenzie$elm_geometry$Vector2d$dot, row1, vector);
          var dot1 = _v2.a;
          return A2(
              $ianmackenzie$elm_geometry$Vector2d$fromTuple,
              $ianmackenzie$elm_units$Quantity$float,
              _Utils_Tuple2(dot1, dot2));
      });
  var $ianmackenzie$elm_geometry$Vector2d$xComponent = function (_v0) {
      var v = _v0.a;
      return $ianmackenzie$elm_units$Quantity$Quantity(v.x);
  };
  var $ianmackenzie$elm_geometry$Vector2d$yComponent = function (_v0) {
      var v = _v0.a;
      return $ianmackenzie$elm_units$Quantity$Quantity(v.y);
  };
  var $ianmackenzie$elm_geometry$Vector2d$toTuple = F2(
      function (fromQuantity, vector) {
          return _Utils_Tuple2(
              fromQuantity(
                  $ianmackenzie$elm_geometry$Vector2d$xComponent(vector)),
              fromQuantity(
                  $ianmackenzie$elm_geometry$Vector2d$yComponent(vector)));
      });
  var $folkertdev$one_true_path_experiment$Geometry$Ellipse$coordinatePrime = function (_v0) {
      var start = _v0.start;
      var end = _v0.end;
      var xAxisRotate = _v0.xAxisRotate;
      var rotate = $folkertdev$one_true_path_experiment$Geometry$Ellipse$inverseConversionMatrix(xAxisRotate);
      return A2(
          $ianmackenzie$elm_geometry$Vector2d$toTuple,
          $ianmackenzie$elm_units$Quantity$toFloat,
          A2(
              $folkertdev$one_true_path_experiment$Geometry$Ellipse$matrixMulVector,
              rotate,
              A2(
                  $ianmackenzie$elm_geometry$Vector2d$toTuple,
                  $ianmackenzie$elm_units$Quantity$toFloat,
                  A2(
                      $ianmackenzie$elm_geometry$Vector2d$scaleBy,
                      0.5,
                      A2(
                          $ianmackenzie$elm_geometry$Vector2d$minus,
                          A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, end),
                          A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, start))))));
  };
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags = function (_v0) {
      var arcFlag = _v0.a;
      var direction = _v0.b;
      var _v1 = _Utils_Tuple2(arcFlag, direction);
      if (_v1.a.$ === 'LargestArc') {
          if (_v1.b.$ === 'Clockwise') {
              var _v2 = _v1.a;
              var _v3 = _v1.b;
              return _Utils_Tuple2(1, 0);
          } else {
              var _v6 = _v1.a;
              var _v7 = _v1.b;
              return _Utils_Tuple2(1, 1);
          }
      } else {
          if (_v1.b.$ === 'Clockwise') {
              var _v4 = _v1.a;
              var _v5 = _v1.b;
              return _Utils_Tuple2(0, 0);
          } else {
              var _v8 = _v1.a;
              var _v9 = _v1.b;
              return _Utils_Tuple2(0, 1);
          }
      }
  };
  var $elm$core$Basics$truncate = _Basics_truncate;
  var $folkertdev$one_true_path_experiment$Geometry$Ellipse$mod2pi_ = function (x) {
      return x - ((((x / (2 * $elm$core$Basics$pi)) | 0) * 2) * $elm$core$Basics$pi);
  };
  var $ianmackenzie$elm_geometry$Vector2d$plus = F2(
      function (_v0, _v1) {
          var v2 = _v0.a;
          var v1 = _v1.a;
          return $ianmackenzie$elm_geometry$Geometry$Types$Vector2d(
              {x: v1.x + v2.x, y: v1.y + v2.y});
      });
  var $elm$core$Basics$pow = _Basics_pow;
  var $elm$core$Basics$acos = _Basics_acos;
  var $ianmackenzie$elm_geometry$Vector2d$cross = F2(
      function (_v0, _v1) {
          var v2 = _v0.a;
          var v1 = _v1.a;
          return $ianmackenzie$elm_units$Quantity$Quantity((v1.x * v2.y) - (v1.y * v2.x));
      });
  var $folkertdev$one_true_path_experiment$Geometry$Ellipse$signedAngle = F2(
      function (u, v) {
          var _v0 = $ianmackenzie$elm_geometry$Vector2d$length(v);
          var lengthV = _v0.a;
          var _v1 = $ianmackenzie$elm_geometry$Vector2d$length(u);
          var lengthU = _v1.a;
          var _v2 = A2($ianmackenzie$elm_geometry$Vector2d$dot, u, v);
          var dot = _v2.a;
          var _v3 = A2($ianmackenzie$elm_geometry$Vector2d$cross, v, u);
          var cross = _v3.a;
          var sign = (cross < 0) ? (-1) : 1;
          return sign * $elm$core$Basics$abs(
              $elm$core$Basics$acos(dot / (lengthU * lengthV)));
      });
  var $folkertdev$one_true_path_experiment$Geometry$Ellipse$tau = 2 * $elm$core$Basics$pi;
  var $folkertdev$one_true_path_experiment$Geometry$Ellipse$endpointToCenter = function (parameterization) {
      var start = parameterization.start;
      var end = parameterization.end;
      var radii = parameterization.radii;
      var xAxisRotate = parameterization.xAxisRotate;
      var arcFlag = parameterization.arcFlag;
      var direction = parameterization.direction;
      var sign = function (_v7) {
          var a = _v7.a;
          var b = _v7.b;
          return _Utils_eq(a, b);
      }(
          $folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags(
              _Utils_Tuple2(arcFlag, direction))) ? (-1) : 1;
      var _v0 = $folkertdev$one_true_path_experiment$Geometry$Ellipse$coordinatePrime(parameterization);
      var x1_ = _v0.a;
      var y1_ = _v0.b;
      var p1 = A2(
          $ianmackenzie$elm_geometry$Vector2d$fromTuple,
          $ianmackenzie$elm_units$Quantity$float,
          _Utils_Tuple2(x1_, y1_));
      var _v1 = radii;
      var rx = _v1.a;
      var ry = _v1.b;
      var denominator = (A2($elm$core$Basics$pow, rx, 2) * A2($elm$core$Basics$pow, y1_, 2)) + (A2($elm$core$Basics$pow, ry, 2) * A2($elm$core$Basics$pow, x1_, 2));
      var numerator = ((A2($elm$core$Basics$pow, rx, 2) * A2($elm$core$Basics$pow, ry, 2)) - (A2($elm$core$Basics$pow, rx, 2) * A2($elm$core$Basics$pow, y1_, 2))) - (A2($elm$core$Basics$pow, ry, 2) * A2($elm$core$Basics$pow, x1_, 2));
      var root = ((!denominator) || (numerator < 0)) ? 0 : (sign * $elm$core$Basics$sqrt(numerator / denominator));
      var center_ = A2(
          $ianmackenzie$elm_geometry$Vector2d$fromTuple,
          $ianmackenzie$elm_units$Quantity$float,
          _Utils_Tuple2(((rx * y1_) / ry) * root, ((-1) * ((ry * x1_) / rx)) * root));
      var center = A2(
          $ianmackenzie$elm_geometry$Vector2d$plus,
          A2(
              $ianmackenzie$elm_geometry$Vector2d$scaleBy,
              0.5,
              A2(
                  $ianmackenzie$elm_geometry$Vector2d$plus,
                  A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, start),
                  A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, end))),
          A2(
              $folkertdev$one_true_path_experiment$Geometry$Ellipse$matrixMulVector,
              $folkertdev$one_true_path_experiment$Geometry$Ellipse$conversionMatrix(xAxisRotate),
              A2($ianmackenzie$elm_geometry$Vector2d$toTuple, $ianmackenzie$elm_units$Quantity$toFloat, center_)));
      var _v2 = radii;
      var radiusX = _v2.a;
      var radiusY = _v2.b;
      var deltaTheta = function () {
          var second = A2(
              $ianmackenzie$elm_geometry$Vector2d$fromTuple,
              $ianmackenzie$elm_units$Quantity$float,
              function (_v6) {
                  var x = _v6.a;
                  var y = _v6.b;
                  return _Utils_Tuple2(x / radiusX, y / radiusY);
              }(
                  A2(
                      $ianmackenzie$elm_geometry$Vector2d$toTuple,
                      $ianmackenzie$elm_units$Quantity$toFloat,
                      A2(
                          $ianmackenzie$elm_geometry$Vector2d$minus,
                          center_,
                          A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, -1, p1)))));
          var first = A2(
              $ianmackenzie$elm_geometry$Vector2d$fromTuple,
              $ianmackenzie$elm_units$Quantity$float,
              function (_v5) {
                  var x = _v5.a;
                  var y = _v5.b;
                  return _Utils_Tuple2(x / radiusX, y / radiusY);
              }(
                  A2(
                      $ianmackenzie$elm_geometry$Vector2d$toTuple,
                      $ianmackenzie$elm_units$Quantity$toFloat,
                      A2($ianmackenzie$elm_geometry$Vector2d$minus, center_, p1))));
          return A2($folkertdev$one_true_path_experiment$Geometry$Ellipse$signedAngle, first, second);
      }();
      var startAngle = function () {
          var temp = A2(
              $folkertdev$one_true_path_experiment$Geometry$Ellipse$signedAngle,
              A2(
                  $ianmackenzie$elm_geometry$Vector2d$fromTuple,
                  $ianmackenzie$elm_units$Quantity$float,
                  _Utils_Tuple2(1, 0)),
              A2(
                  $ianmackenzie$elm_geometry$Vector2d$fromTuple,
                  $ianmackenzie$elm_units$Quantity$float,
                  function (_v4) {
                      var x = _v4.a;
                      var y = _v4.b;
                      return _Utils_Tuple2(x / radiusX, y / radiusY);
                  }(
                      A2(
                          $ianmackenzie$elm_geometry$Vector2d$toTuple,
                          $ianmackenzie$elm_units$Quantity$toFloat,
                          A2($ianmackenzie$elm_geometry$Vector2d$minus, center_, p1)))));
          var _v3 = $folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags(
              _Utils_Tuple2(arcFlag, direction));
          var fs = _v3.b;
          return $folkertdev$one_true_path_experiment$Geometry$Ellipse$mod2pi_(
              ((!fs) && (deltaTheta > 0)) ? (temp - $folkertdev$one_true_path_experiment$Geometry$Ellipse$tau) : (((fs === 1) && (deltaTheta < 0)) ? (temp + $folkertdev$one_true_path_experiment$Geometry$Ellipse$tau) : temp));
      }();
      var result = {
          center: A2($ianmackenzie$elm_geometry$Vector2d$toTuple, $ianmackenzie$elm_units$Quantity$toFloat, center),
          deltaTheta: deltaTheta,
          radii: radii,
          startAngle: startAngle,
          xAxisRotate: xAxisRotate
      };
      return result;
  };
  var $ianmackenzie$elm_geometry$Direction2d$fromAngle = function (_v0) {
      var angle = _v0.a;
      return $ianmackenzie$elm_geometry$Geometry$Types$Direction2d(
          {
              x: $elm$core$Basics$cos(angle),
              y: $elm$core$Basics$sin(angle)
          });
  };
  var $ianmackenzie$elm_geometry$Point2d$xy = F2(
      function (_v0, _v1) {
          var x = _v0.a;
          var y = _v1.a;
          return $ianmackenzie$elm_geometry$Geometry$Types$Point2d(
              {x: x, y: y});
      });
  var $ianmackenzie$elm_geometry$Point2d$fromTuple = F2(
      function (toQuantity, _v0) {
          var x = _v0.a;
          var y = _v0.b;
          return A2(
              $ianmackenzie$elm_geometry$Point2d$xy,
              toQuantity(x),
              toQuantity(y));
      });
  var $ianmackenzie$elm_geometry$Geometry$Types$EllipticalArc2d = function (a) {
      return {$: 'EllipticalArc2d', a: a};
  };
  var $ianmackenzie$elm_geometry$Geometry$Types$Ellipse2d = function (a) {
      return {$: 'Ellipse2d', a: a};
  };
  var $ianmackenzie$elm_geometry$Direction2d$rotateCounterclockwise = function (_v0) {
      var d = _v0.a;
      return $ianmackenzie$elm_geometry$Geometry$Types$Direction2d(
          {x: -d.y, y: d.x});
  };
  var $ianmackenzie$elm_geometry$Frame2d$unsafe = function (properties) {
      return $ianmackenzie$elm_geometry$Geometry$Types$Frame2d(properties);
  };
  var $ianmackenzie$elm_geometry$Frame2d$withXDirection = F2(
      function (givenDirection, givenOrigin) {
          return $ianmackenzie$elm_geometry$Frame2d$unsafe(
              {
                  originPoint: givenOrigin,
                  xDirection: givenDirection,
                  yDirection: $ianmackenzie$elm_geometry$Direction2d$rotateCounterclockwise(givenDirection)
              });
      });
  var $ianmackenzie$elm_geometry$Ellipse2d$with = function (properties) {
      return $ianmackenzie$elm_geometry$Geometry$Types$Ellipse2d(
          {
              axes: A2($ianmackenzie$elm_geometry$Frame2d$withXDirection, properties.xDirection, properties.centerPoint),
              xRadius: $ianmackenzie$elm_units$Quantity$abs(properties.xRadius),
              yRadius: $ianmackenzie$elm_units$Quantity$abs(properties.yRadius)
          });
  };
  var $ianmackenzie$elm_geometry$EllipticalArc2d$with = function (properties) {
      return $ianmackenzie$elm_geometry$Geometry$Types$EllipticalArc2d(
          {
              ellipse: $ianmackenzie$elm_geometry$Ellipse2d$with(
                  {centerPoint: properties.centerPoint, xDirection: properties.xDirection, xRadius: properties.xRadius, yRadius: properties.yRadius}),
              startAngle: properties.startAngle,
              sweptAngle: properties.sweptAngle
          });
  };
  var $folkertdev$one_true_path_experiment$Segment$ellipticalArc = F2(
      function (start, _v0) {
          var radii = _v0.radii;
          var xAxisRotate = _v0.xAxisRotate;
          var arcFlag = _v0.arcFlag;
          var direction = _v0.direction;
          var target = _v0.target;
          var center = $folkertdev$one_true_path_experiment$Geometry$Ellipse$endpointToCenter(
              {arcFlag: arcFlag, direction: direction, end: target, radii: radii, start: start, xAxisRotate: xAxisRotate});
          var _v1 = radii;
          var rx = _v1.a;
          var ry = _v1.b;
          return $folkertdev$one_true_path_experiment$Segment$Arc(
              $ianmackenzie$elm_geometry$EllipticalArc2d$with(
                  {
                      centerPoint: A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, center.center),
                      startAngle: $ianmackenzie$elm_units$Angle$radians(center.startAngle),
                      sweptAngle: $ianmackenzie$elm_units$Angle$radians(center.deltaTheta),
                      xDirection: $ianmackenzie$elm_geometry$Direction2d$fromAngle(
                          $ianmackenzie$elm_units$Angle$radians(center.xAxisRotate)),
                      xRadius: $ianmackenzie$elm_units$Quantity$float(center.radii.a),
                      yRadius: $ianmackenzie$elm_units$Quantity$float(center.radii.b)
                  }));
      });
  var $ianmackenzie$elm_geometry$Geometry$Types$LineSegment2d = function (a) {
      return {$: 'LineSegment2d', a: a};
  };
  var $ianmackenzie$elm_geometry$LineSegment2d$fromEndpoints = $ianmackenzie$elm_geometry$Geometry$Types$LineSegment2d;
  var $ianmackenzie$elm_geometry$LineSegment2d$from = F2(
      function (startPoint_, endPoint_) {
          return $ianmackenzie$elm_geometry$LineSegment2d$fromEndpoints(
              _Utils_Tuple2(startPoint_, endPoint_));
      });
  var $ianmackenzie$elm_geometry$Geometry$Types$CubicSpline2d = function (a) {
      return {$: 'CubicSpline2d', a: a};
  };
  var $ianmackenzie$elm_geometry$CubicSpline2d$fromControlPoints = F4(
      function (p1, p2, p3, p4) {
          return $ianmackenzie$elm_geometry$Geometry$Types$CubicSpline2d(
              {firstControlPoint: p1, fourthControlPoint: p4, secondControlPoint: p2, thirdControlPoint: p3});
      });
  var $ianmackenzie$elm_geometry$Geometry$Types$QuadraticSpline2d = function (a) {
      return {$: 'QuadraticSpline2d', a: a};
  };
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$fromControlPoints = F3(
      function (p1, p2, p3) {
          return $ianmackenzie$elm_geometry$Geometry$Types$QuadraticSpline2d(
              {firstControlPoint: p1, secondControlPoint: p2, thirdControlPoint: p3});
      });
  var $folkertdev$one_true_path_experiment$Segment$traverse = F3(
      function (folder, initial, elements) {
          return $elm$core$List$reverse(
              A3(
                  $elm$core$List$foldl,
                  folder,
                  _Utils_Tuple2(initial, _List_Nil),
                  elements).b);
      });
  var $folkertdev$one_true_path_experiment$Segment$toSegment = F2(
      function (state, drawto) {
          var start = A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, state.cursor);
          var _v0 = A2($ianmackenzie$elm_geometry$Point2d$toTuple, $ianmackenzie$elm_units$Quantity$toFloat, start);
          var startX = _v0.a;
          var startY = _v0.b;
          switch (drawto.$) {
              case 'LineTo':
                  var coordinates_ = drawto.a;
                  var coordinates = A2(
                      $elm$core$List$map,
                      $ianmackenzie$elm_geometry$Point2d$fromTuple($ianmackenzie$elm_units$Quantity$float),
                      coordinates_);
                  return A3(
                      $elm$core$List$map2,
                      F2(
                          function (f, t) {
                              return $folkertdev$one_true_path_experiment$Segment$LineSegment(
                                  A2($ianmackenzie$elm_geometry$LineSegment2d$from, f, t));
                          }),
                      A2($elm$core$List$cons, start, coordinates),
                      coordinates);
              case 'CurveTo':
                  var coordinates = drawto.a;
                  var toPoint2ds = function (_v4) {
                      var startControlPoint = _v4.a;
                      var endControlPoint = _v4.b;
                      var endPoint = _v4.c;
                      return _Utils_Tuple3(
                          A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, startControlPoint),
                          A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, endControlPoint),
                          A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, endPoint));
                  };
                  var folder = F2(
                      function (_v2, _v3) {
                          var c1 = _v2.a;
                          var c2 = _v2.b;
                          var p = _v2.c;
                          var segmentStart = _v3.a;
                          var accum = _v3.b;
                          return _Utils_Tuple2(
                              p,
                              A2(
                                  $elm$core$List$cons,
                                  $folkertdev$one_true_path_experiment$Segment$Cubic(
                                      A4($ianmackenzie$elm_geometry$CubicSpline2d$fromControlPoints, segmentStart, c1, c2, p)),
                                  accum));
                      });
                  return A3(
                      $folkertdev$one_true_path_experiment$Segment$traverse,
                      folder,
                      start,
                      A2($elm$core$List$map, toPoint2ds, coordinates));
              case 'QuadraticBezierCurveTo':
                  var coordinates = drawto.a;
                  var toPoint2ds = function (_v7) {
                      var controlPoint = _v7.a;
                      var endPoint = _v7.b;
                      return _Utils_Tuple2(
                          A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, controlPoint),
                          A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, endPoint));
                  };
                  var folder = F2(
                      function (_v5, _v6) {
                          var c = _v5.a;
                          var p = _v5.b;
                          var segmentStart = _v6.a;
                          var accum = _v6.b;
                          return _Utils_Tuple2(
                              p,
                              A2(
                                  $elm$core$List$cons,
                                  $folkertdev$one_true_path_experiment$Segment$Quadratic(
                                      A3($ianmackenzie$elm_geometry$QuadraticSpline2d$fromControlPoints, segmentStart, c, p)),
                                  accum));
                      });
                  return A3(
                      $folkertdev$one_true_path_experiment$Segment$traverse,
                      folder,
                      start,
                      A2($elm$core$List$map, toPoint2ds, coordinates));
              case 'EllipticalArc':
                  var _arguments = drawto.a;
                  var folder = F2(
                      function (args, _v8) {
                          var segmentStart = _v8.a;
                          var accum = _v8.b;
                          return _Utils_Tuple2(
                              args.target,
                              A2(
                                  $elm$core$List$cons,
                                  A2($folkertdev$one_true_path_experiment$Segment$ellipticalArc, segmentStart, args),
                                  accum));
                      });
                  return A3(
                      $folkertdev$one_true_path_experiment$Segment$traverse,
                      folder,
                      A2($ianmackenzie$elm_geometry$Point2d$toTuple, $ianmackenzie$elm_units$Quantity$toFloat, start),
                      _arguments);
              default:
                  return _List_Nil;
          }
      });
  var $elm$core$Maybe$withDefault = F2(
      function (_default, maybe) {
          if (maybe.$ === 'Just') {
              var value = maybe.a;
              return value;
          } else {
              return _default;
          }
      });
  var $folkertdev$one_true_path_experiment$SubPath$toSegments = function (subpath) {
      if (subpath.$ === 'Empty') {
          return _List_Nil;
      } else {
          var moveto = subpath.a.moveto;
          var drawtos = subpath.a.drawtos;
          var coordinate = moveto.a;
          var folder = F2(
              function (drawto, _v2) {
                  var previousState = _v2.a;
                  var accum = _v2.b;
                  var newSegments = A2($folkertdev$one_true_path_experiment$Segment$toSegment, previousState, drawto);
                  var finalNewSegment = A2(
                      $elm$core$Maybe$withDefault,
                      previousState,
                      A2(
                          $elm$core$Maybe$map,
                          $folkertdev$one_true_path_experiment$Segment$toCursorState,
                          $elm_community$list_extra$List$Extra$last(newSegments)));
                  return _Utils_Tuple2(
                      finalNewSegment,
                      _Utils_ap(accum, newSegments));
              });
          var cursorState = {cursor: coordinate, previousControlPoint: $elm$core$Maybe$Nothing, start: coordinate};
          return A3(
              $elm$core$List$foldl,
              folder,
              _Utils_Tuple2(cursorState, _List_Nil),
              $folkertdev$elm_deque$Deque$toList(drawtos)).b;
      }
  };
  var $folkertdev$one_true_path_experiment$SubPath$arcLengthParameterized = F2(
      function (tolerance, subpath) {
          return A2(
              $folkertdev$one_true_path_experiment$SubPath$arcLengthParameterizedHelper,
              tolerance,
              $folkertdev$one_true_path_experiment$SubPath$toSegments(subpath));
      });
  var $elm$virtual_dom$VirtualDom$nodeNS = F2(
      function (namespace, tag) {
          return A2(
              _VirtualDom_nodeNS,
              namespace,
              _VirtualDom_noScript(tag));
      });
  var $elm_community$typed_svg$TypedSvg$Core$node = $elm$virtual_dom$VirtualDom$nodeNS('http://www.w3.org/2000/svg');
  var $elm_community$typed_svg$TypedSvg$defs = $elm_community$typed_svg$TypedSvg$Core$node('defs');
  var $elm_community$typed_svg$TypedSvg$Types$MarkerCoordinateSystemStrokeWidth = {$: 'MarkerCoordinateSystemStrokeWidth'};
  var $elm$core$String$concat = function (strings) {
      return A2($elm$core$String$join, '', strings);
  };
  var $elm$core$String$fromFloat = _String_fromNumber;
  var $elm$core$Basics$round = _Basics_round;
  var $avh4$elm_color$Color$toCssString = function (_v0) {
      var r = _v0.a;
      var g = _v0.b;
      var b = _v0.c;
      var a = _v0.d;
      var roundTo = function (x) {
          return $elm$core$Basics$round(x * 1000) / 1000;
      };
      var pct = function (x) {
          return $elm$core$Basics$round(x * 10000) / 100;
      };
      return $elm$core$String$concat(
          _List_fromArray(
              [
                  'rgba(',
                  $elm$core$String$fromFloat(
                  pct(r)),
                  '%,',
                  $elm$core$String$fromFloat(
                  pct(g)),
                  '%,',
                  $elm$core$String$fromFloat(
                  pct(b)),
                  '%,',
                  $elm$core$String$fromFloat(
                  roundTo(a)),
                  ')'
              ]));
  };
  var $elm_community$typed_svg$TypedSvg$TypesToStrings$paintToString = function (paint) {
      switch (paint.$) {
          case 'Paint':
              var color = paint.a;
              return $avh4$elm_color$Color$toCssString(color);
          case 'CSSVariable':
              var string = paint.a;
              return $elm$core$String$concat(
                  _List_fromArray(
                      ['var(' + (string + ')')]));
          case 'Reference':
              var string = paint.a;
              return $elm$core$String$concat(
                  _List_fromArray(
                      ['url(#', string, ')']));
          case 'ContextFill':
              return 'context-fill';
          case 'ContextStroke':
              return 'context-stroke';
          default:
              return 'none';
      }
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$fill = A2(
      $elm$core$Basics$composeL,
      $elm_community$typed_svg$TypedSvg$Core$attribute('fill'),
      $elm_community$typed_svg$TypedSvg$TypesToStrings$paintToString);
  var $elm_community$typed_svg$TypedSvg$Attributes$id = $elm_community$typed_svg$TypedSvg$Core$attribute('id');
  var $elm_community$typed_svg$TypedSvg$marker = $elm_community$typed_svg$TypedSvg$Core$node('marker');
  var $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString = function (length) {
      switch (length.$) {
          case 'Cm':
              var x = length.a;
              return $elm$core$String$fromFloat(x) + 'cm';
          case 'Em':
              var x = length.a;
              return $elm$core$String$fromFloat(x) + 'em';
          case 'Ex':
              var x = length.a;
              return $elm$core$String$fromFloat(x) + 'ex';
          case 'In':
              var x = length.a;
              return $elm$core$String$fromFloat(x) + 'in';
          case 'Mm':
              var x = length.a;
              return $elm$core$String$fromFloat(x) + 'mm';
          case 'Num':
              var x = length.a;
              return $elm$core$String$fromFloat(x);
          case 'Pc':
              var x = length.a;
              return $elm$core$String$fromFloat(x) + 'pc';
          case 'Percent':
              var x = length.a;
              return $elm$core$String$fromFloat(x) + '%';
          case 'Pt':
              var x = length.a;
              return $elm$core$String$fromFloat(x) + 'pt';
          case 'Px':
              var x = length.a;
              return $elm$core$String$fromFloat(x) + 'px';
          default:
              var x = length.a;
              return $elm$core$String$fromFloat(x) + 'rem';
      }
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$markerHeight = function (mHeight) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'markerHeight',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(mHeight));
  };
  var $elm_community$typed_svg$TypedSvg$TypesToStrings$markerCoordinateSystemToString = function (markerCoordinateSystem) {
      if (markerCoordinateSystem.$ === 'MarkerCoordinateSystemUserSpaceOnUse') {
          return 'userSpaceOnUse';
      } else {
          return 'strokeWidth';
      }
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$markerUnits = function (markerCoordinateSystem) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'markerUnits',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$markerCoordinateSystemToString(markerCoordinateSystem));
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$markerWidth = function (mWidth) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'markerWidth',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(mWidth));
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$orient = $elm_community$typed_svg$TypedSvg$Core$attribute('orient');
  var $elm_community$typed_svg$TypedSvg$Attributes$points = function (pts) {
      var pointToString = function (_v0) {
          var xx = _v0.a;
          var yy = _v0.b;
          return $elm$core$String$fromFloat(xx) + (', ' + $elm$core$String$fromFloat(yy));
      };
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'points',
          A2(
              $elm$core$String$join,
              ' ',
              A2($elm$core$List$map, pointToString, pts)));
  };
  var $elm_community$typed_svg$TypedSvg$polygon = $elm_community$typed_svg$TypedSvg$Core$node('polygon');
  var $elm_community$typed_svg$TypedSvg$Attributes$refX = $elm_community$typed_svg$TypedSvg$Core$attribute('refX');
  var $elm_community$typed_svg$TypedSvg$Attributes$refY = $elm_community$typed_svg$TypedSvg$Core$attribute('refY');
  var $elm_community$typed_svg$TypedSvg$Attributes$stroke = A2(
      $elm$core$Basics$composeL,
      $elm_community$typed_svg$TypedSvg$Core$attribute('stroke'),
      $elm_community$typed_svg$TypedSvg$TypesToStrings$paintToString);
  var $elm_community$typed_svg$TypedSvg$Attributes$viewBox = F4(
      function (minX, minY, vWidth, vHeight) {
          return A2(
              $elm_community$typed_svg$TypedSvg$Core$attribute,
              'viewBox',
              A2(
                  $elm$core$String$join,
                  ' ',
                  A2(
                      $elm$core$List$map,
                      $elm$core$String$fromFloat,
                      _List_fromArray(
                          [minX, minY, vWidth, vHeight]))));
      });
  var $goyalarchit$elm_dagre$Render$StandardDrawers$triangleHeadElement = function (stroke) {
      return A2(
          $elm_community$typed_svg$TypedSvg$marker,
          _List_fromArray(
              [
                  $elm_community$typed_svg$TypedSvg$Attributes$id('triangle-head'),
                  A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 9, 6),
                  $elm_community$typed_svg$TypedSvg$Attributes$markerWidth(
                  $elm_community$typed_svg$TypedSvg$Types$Px(4.5)),
                  $elm_community$typed_svg$TypedSvg$Attributes$markerHeight(
                  $elm_community$typed_svg$TypedSvg$Types$Px(3)),
                  $elm_community$typed_svg$TypedSvg$Attributes$refX('6'),
                  $elm_community$typed_svg$TypedSvg$Attributes$refY('3'),
                  $elm_community$typed_svg$TypedSvg$Attributes$orient('auto'),
                  $elm_community$typed_svg$TypedSvg$Attributes$markerUnits($elm_community$typed_svg$TypedSvg$Types$MarkerCoordinateSystemStrokeWidth)
              ]),
          _List_fromArray(
              [
                  A2(
                  $elm_community$typed_svg$TypedSvg$polygon,
                  _List_fromArray(
                      [
                          $elm_community$typed_svg$TypedSvg$Attributes$points(
                          _List_fromArray(
                              [
                                  _Utils_Tuple2(0, 0),
                                  _Utils_Tuple2(0, 6),
                                  _Utils_Tuple2(9, 3)
                              ])),
                          $elm_community$typed_svg$TypedSvg$Attributes$stroke(
                          $elm_community$typed_svg$TypedSvg$Types$Paint(stroke)),
                          $elm_community$typed_svg$TypedSvg$Attributes$fill(
                          $elm_community$typed_svg$TypedSvg$Types$Paint(stroke))
                      ]),
                  _List_Nil)
              ]));
  };
  var $goyalarchit$elm_dagre$Render$StandardDrawers$veeHeadElement = function (stroke) {
      return A2(
          $elm_community$typed_svg$TypedSvg$marker,
          _List_fromArray(
              [
                  $elm_community$typed_svg$TypedSvg$Attributes$id('vee-head'),
                  A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 9, 6),
                  $elm_community$typed_svg$TypedSvg$Attributes$markerWidth(
                  $elm_community$typed_svg$TypedSvg$Types$Px(4.5)),
                  $elm_community$typed_svg$TypedSvg$Attributes$markerHeight(
                  $elm_community$typed_svg$TypedSvg$Types$Px(3)),
                  $elm_community$typed_svg$TypedSvg$Attributes$refX('6'),
                  $elm_community$typed_svg$TypedSvg$Attributes$refY('3'),
                  $elm_community$typed_svg$TypedSvg$Attributes$orient('auto'),
                  $elm_community$typed_svg$TypedSvg$Attributes$markerUnits($elm_community$typed_svg$TypedSvg$Types$MarkerCoordinateSystemStrokeWidth)
              ]),
          _List_fromArray(
              [
                  A2(
                  $elm_community$typed_svg$TypedSvg$polygon,
                  _List_fromArray(
                      [
                          $elm_community$typed_svg$TypedSvg$Attributes$points(
                          _List_fromArray(
                              [
                                  _Utils_Tuple2(0, 0),
                                  _Utils_Tuple2(4.5, 3),
                                  _Utils_Tuple2(0, 6),
                                  _Utils_Tuple2(9, 3)
                              ])),
                          $elm_community$typed_svg$TypedSvg$Attributes$stroke(
                          $elm_community$typed_svg$TypedSvg$Types$Paint(stroke)),
                          $elm_community$typed_svg$TypedSvg$Attributes$fill(
                          $elm_community$typed_svg$TypedSvg$Types$Paint(stroke))
                      ]),
                  _List_Nil)
              ]));
  };
  var $goyalarchit$elm_dagre$Render$StandardDrawers$arrowHeadDef = F2(
      function (ahs, stroke) {
          switch (ahs.$) {
              case 'Triangle':
                  return A2(
                      $elm_community$typed_svg$TypedSvg$defs,
                      _List_Nil,
                      _List_fromArray(
                          [
                              $goyalarchit$elm_dagre$Render$StandardDrawers$triangleHeadElement(stroke)
                          ]));
              case 'Vee':
                  return A2(
                      $elm_community$typed_svg$TypedSvg$defs,
                      _List_Nil,
                      _List_fromArray(
                          [
                              $goyalarchit$elm_dagre$Render$StandardDrawers$veeHeadElement(stroke)
                          ]));
              default:
                  return A2($elm_community$typed_svg$TypedSvg$defs, _List_Nil, _List_Nil);
          }
      });
  var $goyalarchit$elm_dagre$Render$StandardDrawers$arrowHeadId = function (ah) {
      switch (ah.$) {
          case 'None':
              return '';
          case 'Triangle':
              return 'url(#triangle-head)';
          default:
              return 'url(#vee-head)';
      }
  };
  var $folkertdev$one_true_path_experiment$Curve$cardinalPointHelper = F5(
      function (k, p0, p1, p2, p) {
          return _Utils_Tuple3(
              A2(
                  $ianmackenzie$elm_geometry$Vector2d$plus,
                  p1,
                  A2(
                      $ianmackenzie$elm_geometry$Vector2d$scaleBy,
                      k,
                      A2($ianmackenzie$elm_geometry$Vector2d$minus, p0, p2))),
              A2(
                  $ianmackenzie$elm_geometry$Vector2d$plus,
                  p2,
                  A2(
                      $ianmackenzie$elm_geometry$Vector2d$scaleBy,
                      k,
                      A2($ianmackenzie$elm_geometry$Vector2d$minus, p, p1))),
              p2);
      });
  var $folkertdev$one_true_path_experiment$Curve$mapTriplet = F2(
      function (f, _v0) {
          var a = _v0.a;
          var b = _v0.b;
          var c = _v0.c;
          return _Utils_Tuple3(
              f(a),
              f(b),
              f(c));
      });
  var $folkertdev$one_true_path_experiment$Curve$cardinalPoint = F5(
      function (k, p0, p1, p2, p) {
          return A2(
              $folkertdev$one_true_path_experiment$Curve$mapTriplet,
              $ianmackenzie$elm_geometry$Vector2d$toTuple($ianmackenzie$elm_units$Quantity$toFloat),
              A5(
                  $folkertdev$one_true_path_experiment$Curve$cardinalPointHelper,
                  k,
                  A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p0),
                  A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p1),
                  A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p2),
                  A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p)));
      });
  var $folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo = function (a) {
      return {$: 'CurveTo', a: a};
  };
  var $folkertdev$one_true_path_experiment$LowLevel$Command$cubicCurveTo = $folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo;
  var $folkertdev$one_true_path_experiment$SubPath$Empty = {$: 'Empty'};
  var $folkertdev$one_true_path_experiment$SubPath$empty = $folkertdev$one_true_path_experiment$SubPath$Empty;
  var $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo = function (a) {
      return {$: 'LineTo', a: a};
  };
  var $folkertdev$one_true_path_experiment$LowLevel$Command$lineTo = $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo;
  var $folkertdev$one_true_path_experiment$LowLevel$Command$MoveTo = function (a) {
      return {$: 'MoveTo', a: a};
  };
  var $folkertdev$one_true_path_experiment$LowLevel$Command$moveTo = $folkertdev$one_true_path_experiment$LowLevel$Command$MoveTo;
  var $folkertdev$one_true_path_experiment$SubPath$SubPath = function (a) {
      return {$: 'SubPath', a: a};
  };
  var $folkertdev$elm_deque$Deque$Deque = function (a) {
      return {$: 'Deque', a: a};
  };
  var $folkertdev$elm_deque$Internal$rebalance = function (deque) {
      var sizeF = deque.sizeF;
      var sizeR = deque.sizeR;
      var front = deque.front;
      var rear = deque.rear;
      var size1 = ((sizeF + sizeR) / 2) | 0;
      var size2 = (sizeF + sizeR) - size1;
      var balanceConstant = 4;
      if ((sizeF + sizeR) < 2) {
          return deque;
      } else {
          if (_Utils_cmp(sizeF, (balanceConstant * sizeR) + 1) > 0) {
              var newRear = _Utils_ap(
                  rear,
                  $elm$core$List$reverse(
                      A2($elm$core$List$drop, size1, front)));
              var newFront = A2($elm$core$List$take, size1, front);
              return {front: newFront, rear: newRear, sizeF: size1, sizeR: size2};
          } else {
              if (_Utils_cmp(sizeR, (balanceConstant * sizeF) + 1) > 0) {
                  var newRear = A2($elm$core$List$take, size1, rear);
                  var newFront = _Utils_ap(
                      front,
                      $elm$core$List$reverse(
                          A2($elm$core$List$drop, size1, rear)));
                  return {front: newFront, rear: newRear, sizeF: size1, sizeR: size2};
              } else {
                  return deque;
              }
          }
      }
  };
  var $folkertdev$elm_deque$Internal$fromList = function (list) {
      return $folkertdev$elm_deque$Internal$rebalance(
          {
              front: list,
              rear: _List_Nil,
              sizeF: $elm$core$List$length(list),
              sizeR: 0
          });
  };
  var $folkertdev$elm_deque$Deque$fromList = A2($elm$core$Basics$composeL, $folkertdev$elm_deque$Deque$Deque, $folkertdev$elm_deque$Internal$fromList);
  var $folkertdev$one_true_path_experiment$SubPath$with = F2(
      function (moveto, drawtos) {
          return $folkertdev$one_true_path_experiment$SubPath$SubPath(
              {
                  drawtos: $folkertdev$elm_deque$Deque$fromList(drawtos),
                  moveto: moveto
              });
      });
  var $folkertdev$one_true_path_experiment$Curve$cardinal = F2(
      function (tension, points) {
          var k = (1 - tension) / 6;
          var helper = F2(
              function (acc, remainingPoints) {
                  helper:
                  while (true) {
                      if ((remainingPoints.b && remainingPoints.b.b) && remainingPoints.b.b.b) {
                          if (remainingPoints.b.b.b.b) {
                              var p0 = remainingPoints.a;
                              var _v1 = remainingPoints.b;
                              var p1 = _v1.a;
                              var _v2 = _v1.b;
                              var p2 = _v2.a;
                              var _v3 = _v2.b;
                              var p3 = _v3.a;
                              var rest = _v3.b;
                              var $temp$acc = A2(
                                  $elm$core$List$cons,
                                  A5($folkertdev$one_true_path_experiment$Curve$cardinalPoint, k, p0, p1, p2, p3),
                                  acc),
                                  $temp$remainingPoints = A2(
                                  $elm$core$List$cons,
                                  p1,
                                  A2(
                                      $elm$core$List$cons,
                                      p2,
                                      A2($elm$core$List$cons, p3, rest)));
                              acc = $temp$acc;
                              remainingPoints = $temp$remainingPoints;
                              continue helper;
                          } else {
                              var p0 = remainingPoints.a;
                              var _v4 = remainingPoints.b;
                              var p1 = _v4.a;
                              var _v5 = _v4.b;
                              var p2 = _v5.a;
                              return $elm$core$List$reverse(
                                  A2(
                                      $elm$core$List$cons,
                                      A5($folkertdev$one_true_path_experiment$Curve$cardinalPoint, k, p0, p1, p2, p1),
                                      acc));
                          }
                      } else {
                          return _List_Nil;
                      }
                  }
              });
          if (points.b && points.b.b) {
              if (!points.b.b.b) {
                  var p0 = points.a;
                  var _v7 = points.b;
                  var p1 = _v7.a;
                  return A2(
                      $folkertdev$one_true_path_experiment$SubPath$with,
                      $folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(p0),
                      _List_fromArray(
                          [
                              $folkertdev$one_true_path_experiment$LowLevel$Command$lineTo(
                              _List_fromArray(
                                  [p1]))
                          ]));
              } else {
                  var p0 = points.a;
                  var _v8 = points.b;
                  var p1 = _v8.a;
                  var _v9 = _v8.b;
                  var p2 = _v9.a;
                  var rest = _v9.b;
                  return A2(
                      $folkertdev$one_true_path_experiment$SubPath$with,
                      $folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(p0),
                      _List_fromArray(
                          [
                              $folkertdev$one_true_path_experiment$LowLevel$Command$cubicCurveTo(
                              A2(
                                  $elm$core$List$cons,
                                  A5($folkertdev$one_true_path_experiment$Curve$cardinalPoint, k, p1, p0, p1, p2),
                                  A2(helper, _List_Nil, points)))
                          ]));
              }
          } else {
              return $folkertdev$one_true_path_experiment$SubPath$empty;
          }
      });
  var $folkertdev$one_true_path_experiment$Curve$catmullRomDistance = F3(
      function (alpha, p1, p2) {
          var _v0 = $ianmackenzie$elm_geometry$Vector2d$length(
              A2($ianmackenzie$elm_geometry$Vector2d$minus, p2, p1));
          var length = _v0.a;
          var l23_2a = A2($elm$core$Basics$pow, length * length, alpha);
          return _Utils_Tuple2(
              $elm$core$Basics$sqrt(l23_2a),
              l23_2a);
      });
  var $folkertdev$one_true_path_experiment$Curve$epsilon = 1.0e-12;
  var $folkertdev$one_true_path_experiment$Curve$catmullRomPointHelper = F5(
      function (alpha, p0, p1, p2, p3) {
          var _v0 = A3($folkertdev$one_true_path_experiment$Curve$catmullRomDistance, alpha, p2, p3);
          var l23_a = _v0.a;
          var l23_2a = _v0.b;
          var _v1 = A3($folkertdev$one_true_path_experiment$Curve$catmullRomDistance, alpha, p1, p2);
          var l12_a = _v1.a;
          var l12_2a = _v1.b;
          var helper2 = function (p) {
              var m = (3 * l23_a) * (l23_a + l12_a);
              var b = ((2 * l23_2a) + ((3 * l23_a) * l12_a)) + l12_2a;
              return A2(
                  $ianmackenzie$elm_geometry$Vector2d$scaleBy,
                  1 / m,
                  A2(
                      $ianmackenzie$elm_geometry$Vector2d$plus,
                      A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, -l12_2a, p3),
                      A2(
                          $ianmackenzie$elm_geometry$Vector2d$plus,
                          A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, l23_2a, p1),
                          A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, b, p))));
          };
          var control2 = (_Utils_cmp(l23_a, $folkertdev$one_true_path_experiment$Curve$epsilon) > 0) ? helper2(p2) : p2;
          var _v2 = A3($folkertdev$one_true_path_experiment$Curve$catmullRomDistance, alpha, p0, p1);
          var l01_a = _v2.a;
          var l01_2a = _v2.b;
          var helper1 = function (p) {
              var n = (3 * l01_a) * (l01_a + l12_a);
              var a = ((2 * l01_2a) + ((3 * l01_a) * l12_a)) + l12_2a;
              return A2(
                  $ianmackenzie$elm_geometry$Vector2d$scaleBy,
                  1 / n,
                  A2(
                      $ianmackenzie$elm_geometry$Vector2d$plus,
                      A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, l01_2a, p2),
                      A2(
                          $ianmackenzie$elm_geometry$Vector2d$minus,
                          A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, l12_2a, p0),
                          A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, a, p))));
          };
          var control1 = (_Utils_cmp(l01_a, $folkertdev$one_true_path_experiment$Curve$epsilon) > 0) ? helper1(p1) : p1;
          return _Utils_Tuple3(control1, control2, p2);
      });
  var $folkertdev$one_true_path_experiment$Curve$catmullRomPoint = F5(
      function (alpha, p0, p1, p2, p3) {
          return A2(
              $folkertdev$one_true_path_experiment$Curve$mapTriplet,
              $ianmackenzie$elm_geometry$Vector2d$toTuple($ianmackenzie$elm_units$Quantity$toFloat),
              A5(
                  $folkertdev$one_true_path_experiment$Curve$catmullRomPointHelper,
                  alpha,
                  A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p0),
                  A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p1),
                  A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p2),
                  A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p3)));
      });
  var $folkertdev$one_true_path_experiment$Curve$reverseAccumulatorAppendClose = F2(
      function (accumulator, close) {
          return A3($elm$core$List$foldl, $elm$core$List$cons, close, accumulator);
      });
  var $folkertdev$one_true_path_experiment$Curve$catmullRomHelper = F4(
      function (alpha, ending, points, accumulator) {
          catmullRomHelper:
          while (true) {
              if ((points.b && points.b.b) && points.b.b.b) {
                  if (!points.b.b.b.b) {
                      var p0 = points.a;
                      var _v1 = points.b;
                      var p1 = _v1.a;
                      var _v2 = _v1.b;
                      var p2 = _v2.a;
                      return A2(
                          $folkertdev$one_true_path_experiment$Curve$reverseAccumulatorAppendClose,
                          accumulator,
                          A3(ending, p0, p1, p2));
                  } else {
                      var p0 = points.a;
                      var _v3 = points.b;
                      var p1 = _v3.a;
                      var _v4 = _v3.b;
                      var p2 = _v4.a;
                      var _v5 = _v4.b;
                      var p = _v5.a;
                      var rest = _v5.b;
                      var $temp$alpha = alpha,
                          $temp$ending = ending,
                          $temp$points = A2(
                          $elm$core$List$cons,
                          p1,
                          A2(
                              $elm$core$List$cons,
                              p2,
                              A2($elm$core$List$cons, p, rest))),
                          $temp$accumulator = A2(
                          $elm$core$List$cons,
                          A5($folkertdev$one_true_path_experiment$Curve$catmullRomPoint, alpha, p0, p1, p2, p),
                          accumulator);
                      alpha = $temp$alpha;
                      ending = $temp$ending;
                      points = $temp$points;
                      accumulator = $temp$accumulator;
                      continue catmullRomHelper;
                  }
              } else {
                  return _List_Nil;
              }
          }
      });
  var $folkertdev$one_true_path_experiment$Curve$catmullRom = F2(
      function (alpha, points) {
          if (!alpha) {
              return A2($folkertdev$one_true_path_experiment$Curve$cardinal, 0, points);
          } else {
              if (points.b && points.b.b) {
                  if (!points.b.b.b) {
                      var p1 = points.a;
                      var _v1 = points.b;
                      var p2 = _v1.a;
                      return A2(
                          $folkertdev$one_true_path_experiment$SubPath$with,
                          $folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(p1),
                          _List_fromArray(
                              [
                                  $folkertdev$one_true_path_experiment$LowLevel$Command$lineTo(
                                  _List_fromArray(
                                      [p2]))
                              ]));
                  } else {
                      var p0 = points.a;
                      var _v2 = points.b;
                      var p1 = _v2.a;
                      var _v3 = _v2.b;
                      var p2 = _v3.a;
                      var rest = _v3.b;
                      var ending = F3(
                          function (q0, q1, q2) {
                              return _List_fromArray(
                                  [
                                      A5($folkertdev$one_true_path_experiment$Curve$catmullRomPoint, alpha, q0, q1, q2, q2)
                                  ]);
                          });
                      return A2(
                          $folkertdev$one_true_path_experiment$SubPath$with,
                          $folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(p0),
                          _List_fromArray(
                              [
                                  $folkertdev$one_true_path_experiment$LowLevel$Command$cubicCurveTo(
                                  A4(
                                      $folkertdev$one_true_path_experiment$Curve$catmullRomHelper,
                                      alpha,
                                      ending,
                                      A2($elm$core$List$cons, p0, points),
                                      _List_Nil))
                              ]));
                  }
              } else {
                  return $folkertdev$one_true_path_experiment$SubPath$empty;
              }
          }
      });
  var $elm_community$typed_svg$TypedSvg$TypesToStrings$cursorToString = function (cursor) {
      switch (cursor.$) {
          case 'CursorAuto':
              return 'auto';
          case 'CursorDefault':
              return 'default';
          case 'CursorCrosshair':
              return 'crosshair';
          case 'CursorPointer':
              return 'pointer';
          case 'CursorMove':
              return 'move';
          case 'CursorEResize':
              return 'e-resize';
          case 'CursorNEResize':
              return 'ne-resize';
          case 'CursorNWResize':
              return 'nw-resize';
          case 'CursorNResize':
              return 'n-resize';
          case 'CursorSEResize':
              return 'se-resize';
          case 'CursorSWResize':
              return 'sw-resize';
          case 'CursorWResize':
              return 'w-resize';
          case 'CursorText':
              return 'text';
          case 'CursorWait':
              return 'wait';
          case 'CursorHelp':
              return 'help';
          case 'CursorInherit':
              return 'inherit';
          default:
              var funcIRI = cursor.a;
              return funcIRI;
      }
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$cursor = function (csor) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'cursor',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$cursorToString(csor));
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$d = $elm_community$typed_svg$TypedSvg$Core$attribute('d');
  var $goyalarchit$elm_dagre$Render$StandardDrawers$Types$None = {$: 'None'};
  var $goyalarchit$elm_dagre$Render$StandardDrawers$Types$Spline = {$: 'Spline'};
  var $avh4$elm_color$Color$RgbaSpace = F4(
      function (a, b, c, d) {
          return {$: 'RgbaSpace', a: a, b: b, c: c, d: d};
      });
  var $avh4$elm_color$Color$darkGrey = A4($avh4$elm_color$Color$RgbaSpace, 186 / 255, 189 / 255, 182 / 255, 1.0);
  var $goyalarchit$elm_dagre$Render$StandardDrawers$defEdgeDrawerConfig = function () {
      var f_ = function (_v2) {
          return '';
      };
      var f = function (e) {
          return $elm$core$String$fromInt(e.from) + (' → ' + $elm$core$String$fromInt(e.to));
      };
      return {
          alpha: 0.5,
          arrowHead: $goyalarchit$elm_dagre$Render$StandardDrawers$Types$None,
          fontSize: 16,
          label: f_,
          linkStyle: $goyalarchit$elm_dagre$Render$StandardDrawers$Types$Spline,
          onClick: $elm$core$Maybe$Nothing,
          orientLabelAlongEdge: false,
          strokeColor: function (_v0) {
              return $avh4$elm_color$Color$darkGrey;
          },
          strokeDashArray: f_,
          strokeWidth: function (_v1) {
              return 3;
          },
          style: f_,
          title: f
      };
  }();
  var $elm_community$typed_svg$TypedSvg$Types$AnchorMiddle = {$: 'AnchorMiddle'};
  var $elm_community$typed_svg$TypedSvg$Types$DominantBaselineCentral = {$: 'DominantBaselineCentral'};
  var $elm_community$typed_svg$TypedSvg$Types$Translate = F2(
      function (a, b) {
          return {$: 'Translate', a: a, b: b};
      });
  var $elm_community$typed_svg$TypedSvg$TypesToStrings$dominantBaselineToString = function (dominantBaseline) {
      switch (dominantBaseline.$) {
          case 'DominantBaselineAuto':
              return 'auto';
          case 'DominantBaselineUseScript':
              return 'use-script';
          case 'DominantBaselineNoChange':
              return 'no-change';
          case 'DominantBaselineResetSize':
              return 'reset-size';
          case 'DominantBaselineIdeographic':
              return 'ideographic';
          case 'DominantBaselineAlphabetic':
              return 'alphabetic';
          case 'DominantBaselineHanging':
              return 'hanging';
          case 'DominantBaselineMathematical':
              return 'mathematical';
          case 'DominantBaselineCentral':
              return 'central';
          case 'DominantBaselineMiddle':
              return 'middle';
          case 'DominantBaselineTextAfterEdge':
              return 'text-after-edge';
          case 'DominantBaselineTextBeforeEdge':
              return 'text-before-edge';
          default:
              return 'inherit';
      }
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$dominantBaseline = function (baseline) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'dominant-baseline',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$dominantBaselineToString(baseline));
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$fontSize = function (length) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'font-size',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
  };
  var $elm_community$typed_svg$TypedSvg$Core$text = $elm$virtual_dom$VirtualDom$text;
  var $elm_community$typed_svg$TypedSvg$TypesToStrings$anchorAlignmentToString = function (anchorAlignment) {
      switch (anchorAlignment.$) {
          case 'AnchorInherit':
              return 'inherit';
          case 'AnchorStart':
              return 'start';
          case 'AnchorMiddle':
              return 'middle';
          default:
              return 'end';
      }
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$textAnchor = function (anchorAlignment) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'text-anchor',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$anchorAlignmentToString(anchorAlignment));
  };
  var $elm_community$typed_svg$TypedSvg$text_ = $elm_community$typed_svg$TypedSvg$Core$node('text');
  var $elm_community$typed_svg$TypedSvg$TypesToStrings$transformToString = function (xform) {
      var tr = F2(
          function (name, args) {
              return $elm$core$String$concat(
                  _List_fromArray(
                      [
                          name,
                          '(',
                          A2(
                          $elm$core$String$join,
                          ' ',
                          A2($elm$core$List$map, $elm$core$String$fromFloat, args)),
                          ')'
                      ]));
          });
      switch (xform.$) {
          case 'Matrix':
              var a = xform.a;
              var b = xform.b;
              var c = xform.c;
              var d = xform.d;
              var e = xform.e;
              var f = xform.f;
              return A2(
                  tr,
                  'matrix',
                  _List_fromArray(
                      [a, b, c, d, e, f]));
          case 'Rotate':
              var a = xform.a;
              var x = xform.b;
              var y = xform.c;
              return A2(
                  tr,
                  'rotate',
                  _List_fromArray(
                      [a, x, y]));
          case 'Scale':
              var x = xform.a;
              var y = xform.b;
              return A2(
                  tr,
                  'scale',
                  _List_fromArray(
                      [x, y]));
          case 'SkewX':
              var x = xform.a;
              return A2(
                  tr,
                  'skewX',
                  _List_fromArray(
                      [x]));
          case 'SkewY':
              var y = xform.a;
              return A2(
                  tr,
                  'skewY',
                  _List_fromArray(
                      [y]));
          default:
              var x = xform.a;
              var y = xform.b;
              return A2(
                  tr,
                  'translate',
                  _List_fromArray(
                      [x, y]));
      }
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$transform = function (transforms) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'transform',
          A2(
              $elm$core$String$join,
              ' ',
              A2($elm$core$List$map, $elm_community$typed_svg$TypedSvg$TypesToStrings$transformToString, transforms)));
  };
  var $goyalarchit$elm_dagre$Render$StandardDrawers$centeredText = F3(
      function (str, fontSize, _v0) {
          var posX = _v0.a;
          var posY = _v0.b;
          return A2(
              $elm_community$typed_svg$TypedSvg$text_,
              _List_fromArray(
                  [
                      $elm_community$typed_svg$TypedSvg$Attributes$textAnchor($elm_community$typed_svg$TypedSvg$Types$AnchorMiddle),
                      $elm_community$typed_svg$TypedSvg$Attributes$dominantBaseline($elm_community$typed_svg$TypedSvg$Types$DominantBaselineCentral),
                      $elm_community$typed_svg$TypedSvg$Attributes$transform(
                      _List_fromArray(
                          [
                              A2($elm_community$typed_svg$TypedSvg$Types$Translate, posX, posY)
                          ])),
                      $elm_community$typed_svg$TypedSvg$Attributes$fontSize(
                      $elm_community$typed_svg$TypedSvg$Types$Px(fontSize))
                  ]),
              _List_fromArray(
                  [
                      $elm_community$typed_svg$TypedSvg$Core$text(str)
                  ]));
      });
  var $elm_community$typed_svg$TypedSvg$Attributes$href = $elm_community$typed_svg$TypedSvg$Core$attribute('href');
  var $elm$core$Basics$isNaN = _Basics_isNaN;
  var $elm$core$Tuple$mapBoth = F3(
      function (funcA, funcB, _v0) {
          var x = _v0.a;
          var y = _v0.b;
          return _Utils_Tuple2(
              funcA(x),
              funcB(y));
      });
  var $folkertdev$one_true_path_experiment$SubPath$fold = F3(
      function (tagger, parameterized, t) {
          fold:
          while (true) {
              var clamp = F3(
                  function (totalLength, tolerance, length) {
                      return (_Utils_cmp(
                          $elm$core$Basics$abs(length - totalLength),
                          tolerance) < 1) ? totalLength : ((_Utils_cmp(
                          $elm$core$Basics$abs(length),
                          tolerance) < 1) ? 0 : length);
                  });
              switch (parameterized.$) {
                  case 'None':
                      return $elm$core$Maybe$Nothing;
                  case 'Leaf':
                      var segment = parameterized.a.segment;
                      var tolerance = parameterized.a.tolerance;
                      var totalLength = $folkertdev$one_true_path_experiment$Segment$arcLength(segment);
                      var answer = A2(
                          tagger,
                          segment,
                          A3(clamp, totalLength, tolerance, t));
                      return $elm$core$Maybe$Just(answer);
                  default:
                      var totalLength = parameterized.a.totalLength;
                      var lengthAtSplit = parameterized.a.lengthAtSplit;
                      var left = parameterized.a.left;
                      var right = parameterized.a.right;
                      var tolerance = parameterized.a.tolerance;
                      var clamped = A3(clamp, totalLength, tolerance, t);
                      if (_Utils_cmp(clamped, lengthAtSplit) < 1) {
                          var $temp$tagger = tagger,
                              $temp$parameterized = left,
                              $temp$t = clamped;
                          tagger = $temp$tagger;
                          parameterized = $temp$parameterized;
                          t = $temp$t;
                          continue fold;
                      } else {
                          var $temp$tagger = tagger,
                              $temp$parameterized = right,
                              $temp$t = clamped - lengthAtSplit;
                          tagger = $temp$tagger;
                          parameterized = $temp$parameterized;
                          t = $temp$t;
                          continue fold;
                      }
              }
          }
      });
  var $ianmackenzie$elm_geometry$Point2d$interpolateFrom = F3(
      function (_v0, _v1, t) {
          var p1 = _v0.a;
          var p2 = _v1.a;
          return (t <= 0.5) ? $ianmackenzie$elm_geometry$Geometry$Types$Point2d(
              {x: p1.x + (t * (p2.x - p1.x)), y: p1.y + (t * (p2.y - p1.y))}) : $ianmackenzie$elm_geometry$Geometry$Types$Point2d(
              {x: p2.x + ((1 - t) * (p1.x - p2.x)), y: p2.y + ((1 - t) * (p1.y - p2.y))});
      });
  var $ianmackenzie$elm_geometry$LineSegment2d$interpolate = F2(
      function (lineSegment, t) {
          var _v0 = $ianmackenzie$elm_geometry$LineSegment2d$endpoints(lineSegment);
          var start = _v0.a;
          var end = _v0.b;
          return A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, start, end, t);
      });
  var $elm$core$Basics$clamp = F3(
      function (low, high, number) {
          return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
      });
  var $ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom = F3(
      function (start, end, parameter) {
          return (parameter <= 0.5) ? (start + (parameter * (end - start))) : (end + ((1 - parameter) * (start - end)));
      });
  var $ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtStart = function (tree) {
      if (tree.$ === 'Node') {
          var node = tree.a;
          return node.lengthAtStart;
      } else {
          var leaf = tree.a;
          return leaf.length0;
      }
  };
  var $ianmackenzie$elm_geometry$ArcLengthParameterization$unsafeToParameterValue = F2(
      function (tree, s) {
          unsafeToParameterValue:
          while (true) {
              if (tree.$ === 'Leaf') {
                  var length0 = tree.a.length0;
                  var length1 = tree.a.length1;
                  var length2 = tree.a.length2;
                  var length3 = tree.a.length3;
                  var length4 = tree.a.length4;
                  var length5 = tree.a.length5;
                  var length6 = tree.a.length6;
                  var length7 = tree.a.length7;
                  var length8 = tree.a.length8;
                  var param0 = tree.a.param0;
                  var param1 = tree.a.param1;
                  var param2 = tree.a.param2;
                  var param3 = tree.a.param3;
                  var param4 = tree.a.param4;
                  var param5 = tree.a.param5;
                  var param6 = tree.a.param6;
                  var param7 = tree.a.param7;
                  var param8 = tree.a.param8;
                  if (_Utils_cmp(s, length4) < 1) {
                      if (_Utils_cmp(s, length2) < 1) {
                          if (_Utils_cmp(s, length1) < 1) {
                              var lengthFraction = (s - length0) / (length1 - length0);
                              return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param0, param1, lengthFraction);
                          } else {
                              var lengthFraction = (s - length1) / (length2 - length1);
                              return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param1, param2, lengthFraction);
                          }
                      } else {
                          if (_Utils_cmp(s, length3) < 1) {
                              var lengthFraction = (s - length2) / (length3 - length2);
                              return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param2, param3, lengthFraction);
                          } else {
                              var lengthFraction = (s - length3) / (length4 - length3);
                              return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param3, param4, lengthFraction);
                          }
                      }
                  } else {
                      if (_Utils_cmp(s, length6) < 1) {
                          if (_Utils_cmp(s, length5) < 1) {
                              var lengthFraction = (s - length4) / (length5 - length4);
                              return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param4, param5, lengthFraction);
                          } else {
                              var lengthFraction = (s - length5) / (length6 - length5);
                              return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param5, param6, lengthFraction);
                          }
                      } else {
                          if (_Utils_cmp(s, length7) < 1) {
                              var lengthFraction = (s - length6) / (length7 - length6);
                              return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param6, param7, lengthFraction);
                          } else {
                              var lengthFraction = (s - length7) / (length8 - length7);
                              return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param7, param8, lengthFraction);
                          }
                      }
                  }
              } else {
                  var leftBranch = tree.a.leftBranch;
                  var rightBranch = tree.a.rightBranch;
                  if (_Utils_cmp(
                      s,
                      $ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtStart(rightBranch)) < 0) {
                      var $temp$tree = leftBranch,
                          $temp$s = s;
                      tree = $temp$tree;
                      s = $temp$s;
                      continue unsafeToParameterValue;
                  } else {
                      var $temp$tree = rightBranch,
                          $temp$s = s;
                      tree = $temp$tree;
                      s = $temp$s;
                      continue unsafeToParameterValue;
                  }
              }
          }
      });
  var $ianmackenzie$elm_geometry$ArcLengthParameterization$arcLengthToParameterValue = F2(
      function (_v0, _v1) {
          var s = _v0.a;
          var tree = _v1.a;
          return A2(
              $ianmackenzie$elm_geometry$ArcLengthParameterization$unsafeToParameterValue,
              tree,
              A3(
                  $elm$core$Basics$clamp,
                  0,
                  $ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtEnd(tree),
                  s));
      });
  var $ianmackenzie$elm_geometry$CubicSpline2d$pointOn = F2(
      function (spline, parameterValue) {
          var p4 = $ianmackenzie$elm_geometry$CubicSpline2d$fourthControlPoint(spline);
          var p3 = $ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint(spline);
          var q3 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, p3, p4, parameterValue);
          var p2 = $ianmackenzie$elm_geometry$CubicSpline2d$secondControlPoint(spline);
          var q2 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, p2, p3, parameterValue);
          var r2 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, q2, q3, parameterValue);
          var p1 = $ianmackenzie$elm_geometry$CubicSpline2d$firstControlPoint(spline);
          var q1 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, p1, p2, parameterValue);
          var r1 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, q1, q2, parameterValue);
          return A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, r1, r2, parameterValue);
      });
  var $ianmackenzie$elm_geometry$CubicSpline2d$pointAlong = F2(
      function (_v0, distance) {
          var parameterized = _v0.a;
          return A2(
              $ianmackenzie$elm_geometry$CubicSpline2d$pointOn,
              parameterized.underlyingSpline,
              A2($ianmackenzie$elm_geometry$ArcLengthParameterization$arcLengthToParameterValue, distance, parameterized.parameterization));
      });
  var $ianmackenzie$elm_geometry$EllipticalArc2d$pointAlong = F2(
      function (_v0, distance) {
          var parameterized = _v0.a;
          return A2(
              $ianmackenzie$elm_geometry$EllipticalArc2d$pointOn,
              parameterized.underlyingArc,
              A2($ianmackenzie$elm_geometry$ArcLengthParameterization$arcLengthToParameterValue, distance, parameterized.parameterization));
      });
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$pointOn = F2(
      function (spline, parameterValue) {
          var p3 = $ianmackenzie$elm_geometry$QuadraticSpline2d$thirdControlPoint(spline);
          var p2 = $ianmackenzie$elm_geometry$QuadraticSpline2d$secondControlPoint(spline);
          var q2 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, p2, p3, parameterValue);
          var p1 = $ianmackenzie$elm_geometry$QuadraticSpline2d$firstControlPoint(spline);
          var q1 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, p1, p2, parameterValue);
          return A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, q1, q2, parameterValue);
      });
  var $ianmackenzie$elm_geometry$QuadraticSpline2d$pointAlong = F2(
      function (_v0, distance) {
          var parameterized = _v0.a;
          return A2(
              $ianmackenzie$elm_geometry$QuadraticSpline2d$pointOn,
              parameterized.underlyingSpline,
              A2($ianmackenzie$elm_geometry$ArcLengthParameterization$arcLengthToParameterValue, distance, parameterized.parameterization));
      });
  var $folkertdev$one_true_path_experiment$Segment$pointAlong = F2(
      function (parameterized, t) {
          var lengthValue = $ianmackenzie$elm_units$Quantity$float(t);
          return A2(
              $ianmackenzie$elm_geometry$Point2d$toTuple,
              $ianmackenzie$elm_units$Quantity$toFloat,
              function () {
                  switch (parameterized.$) {
                      case 'ParameterizedLineSegment':
                          var lineSegment = parameterized.a;
                          return A2(
                              $ianmackenzie$elm_geometry$LineSegment2d$interpolate,
                              lineSegment,
                              t / $ianmackenzie$elm_units$Quantity$toFloat(
                                  $ianmackenzie$elm_geometry$LineSegment2d$length(lineSegment)));
                      case 'ParameterizedQuadratic':
                          var spline = parameterized.a;
                          return A2($ianmackenzie$elm_geometry$QuadraticSpline2d$pointAlong, spline, lengthValue);
                      case 'ParameterizedCubic':
                          var spline = parameterized.a;
                          return A2($ianmackenzie$elm_geometry$CubicSpline2d$pointAlong, spline, lengthValue);
                      default:
                          var arc = parameterized.a;
                          return A2($ianmackenzie$elm_geometry$EllipticalArc2d$pointAlong, arc, lengthValue);
                  }
              }());
      });
  var $folkertdev$one_true_path_experiment$SubPath$pointAlong = F2(
      function (parameterized, t) {
          return A3($folkertdev$one_true_path_experiment$SubPath$fold, $folkertdev$one_true_path_experiment$Segment$pointAlong, parameterized, t);
      });
  var $elm_community$typed_svg$TypedSvg$Attributes$startOffset = $elm_community$typed_svg$TypedSvg$Core$attribute('startOffset');
  var $elm_community$typed_svg$TypedSvg$textPath = $elm_community$typed_svg$TypedSvg$Core$node('textPath');
  var $goyalarchit$elm_dagre$Render$StandardDrawers$edgeLabelDrawer = F5(
      function (lbl, fontSize, orientLabelAlongEdge, edgePathId, curve) {
          if (orientLabelAlongEdge) {
              return A2(
                  $elm_community$typed_svg$TypedSvg$text_,
                  _List_fromArray(
                      [
                          $elm_community$typed_svg$TypedSvg$Attributes$textAnchor($elm_community$typed_svg$TypedSvg$Types$AnchorMiddle),
                          $elm_community$typed_svg$TypedSvg$Attributes$dominantBaseline($elm_community$typed_svg$TypedSvg$Types$DominantBaselineCentral),
                          $elm_community$typed_svg$TypedSvg$Attributes$fontSize(
                          $elm_community$typed_svg$TypedSvg$Types$Px(fontSize))
                      ]),
                  _List_fromArray(
                      [
                          A2(
                          $elm_community$typed_svg$TypedSvg$textPath,
                          _List_fromArray(
                              [
                                  $elm_community$typed_svg$TypedSvg$Attributes$href('#' + edgePathId),
                                  $elm_community$typed_svg$TypedSvg$Attributes$startOffset('50%')
                              ]),
                          _List_fromArray(
                              [
                                  $elm_community$typed_svg$TypedSvg$Core$text(lbl)
                              ]))
                      ]));
          } else {
              var _v0 = A3(
                  $elm$core$Tuple$mapBoth,
                  function (a) {
                      return $elm$core$Basics$isNaN(a) ? (-10) : a;
                  },
                  function (a) {
                      return $elm$core$Basics$isNaN(a) ? (-10) : a;
                  },
                  function () {
                      var _v1 = A2(
                          $folkertdev$one_true_path_experiment$SubPath$pointAlong,
                          curve,
                          $folkertdev$one_true_path_experiment$SubPath$arcLength(curve) / 2);
                      if (_v1.$ === 'Just') {
                          var m = _v1.a;
                          return m;
                      } else {
                          return _Utils_Tuple2(-10, -10);
                      }
                  }());
              var midX = _v0.a;
              var midY = _v0.b;
              return A3(
                  $goyalarchit$elm_dagre$Render$StandardDrawers$centeredText,
                  lbl,
                  fontSize,
                  _Utils_Tuple2(midX, midY));
          }
      });
  var $elm_community$typed_svg$TypedSvg$g = $elm_community$typed_svg$TypedSvg$Core$node('g');
  var $elm$core$List$append = F2(
      function (xs, ys) {
          if (!ys.b) {
              return xs;
          } else {
              return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
          }
      });
  var $elm$core$List$concat = function (lists) {
      return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
  };
  var $folkertdev$one_true_path_experiment$Curve$linear = function (points) {
      if (!points.b) {
          return $folkertdev$one_true_path_experiment$SubPath$empty;
      } else {
          var x = points.a;
          var xs = points.b;
          return A2(
              $folkertdev$one_true_path_experiment$SubPath$with,
              $folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(x),
              _List_fromArray(
                  [
                      $folkertdev$one_true_path_experiment$LowLevel$Command$lineTo(xs)
                  ]));
      }
  };
  var $goyalarchit$elm_dagre$Render$StandardDrawers$tolerance = 1.0;
  var $goyalarchit$elm_dagre$Render$StandardDrawers$getAdjustedSrcAndTarget = F3(
      function (edgeAtrib, srcMargin, tgtMargin) {
          var pts = $elm$core$List$concat(
              _List_fromArray(
                  [
                      _List_fromArray(
                      [edgeAtrib.source]),
                      edgeAtrib.controlPts,
                      _List_fromArray(
                      [edgeAtrib.target])
                  ]));
          var src_to_next = A2($elm$core$List$take, 2, pts);
          var srcSeg = A2(
              $folkertdev$one_true_path_experiment$SubPath$arcLengthParameterized,
              $goyalarchit$elm_dagre$Render$StandardDrawers$tolerance,
              $folkertdev$one_true_path_experiment$Curve$linear(src_to_next));
          var target_from_previous = A2(
              $elm$core$List$drop,
              $elm$core$List$length(pts) - 2,
              pts);
          var tgtSeg = A2(
              $folkertdev$one_true_path_experiment$SubPath$arcLengthParameterized,
              $goyalarchit$elm_dagre$Render$StandardDrawers$tolerance,
              $folkertdev$one_true_path_experiment$Curve$linear(target_from_previous));
          var _v0 = edgeAtrib.targetDimensions;
          var tw = _v0.a;
          var th = _v0.b;
          var tgtDim = ($elm$core$Basics$sqrt(
              A2($elm$core$Basics$pow, tw, 2) + A2($elm$core$Basics$pow, th, 2)) / 2) + tgtMargin;
          var final_tgt = A2(
              $folkertdev$one_true_path_experiment$SubPath$pointAlong,
              tgtSeg,
              $folkertdev$one_true_path_experiment$SubPath$arcLength(tgtSeg) - tgtDim);
          var _v1 = edgeAtrib.sourceDimensions;
          var sw = _v1.a;
          var sh = _v1.b;
          var srcDim = ($elm$core$Basics$sqrt(
              A2($elm$core$Basics$pow, sw, 2) + A2($elm$core$Basics$pow, sh, 2)) / 2) + srcMargin;
          var final_src = A2($folkertdev$one_true_path_experiment$SubPath$pointAlong, srcSeg, srcDim);
          if (_Utils_eq(edgeAtrib.edge.from, edgeAtrib.edge.to)) {
              return pts;
          } else {
              var _v2 = _Utils_Tuple2(final_src, final_tgt);
              if (_v2.a.$ === 'Just') {
                  if (_v2.b.$ === 'Just') {
                      var s = _v2.a.a;
                      var t = _v2.b.a;
                      return $elm$core$List$concat(
                          _List_fromArray(
                              [
                                  _List_fromArray(
                                  [s]),
                                  edgeAtrib.controlPts,
                                  _List_fromArray(
                                  [t])
                              ]));
                  } else {
                      var s = _v2.a.a;
                      var _v3 = _v2.b;
                      return $elm$core$List$concat(
                          _List_fromArray(
                              [
                                  _List_fromArray(
                                  [s]),
                                  edgeAtrib.controlPts,
                                  _List_fromArray(
                                  [edgeAtrib.target])
                              ]));
                  }
              } else {
                  if (_v2.b.$ === 'Just') {
                      var _v4 = _v2.a;
                      var t = _v2.b.a;
                      return $elm$core$List$concat(
                          _List_fromArray(
                              [
                                  _List_fromArray(
                                  [edgeAtrib.source]),
                                  edgeAtrib.controlPts,
                                  _List_fromArray(
                                  [t])
                              ]));
                  } else {
                      var _v5 = _v2.a;
                      var _v6 = _v2.b;
                      return pts;
                  }
              }
          }
      });
  var $elm_community$typed_svg$TypedSvg$Attributes$markerEnd = $elm_community$typed_svg$TypedSvg$Core$attribute('marker-end');
  var $elm$virtual_dom$VirtualDom$Normal = function (a) {
      return {$: 'Normal', a: a};
  };
  var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
  var $elm_community$typed_svg$TypedSvg$Events$on = $elm$virtual_dom$VirtualDom$on;
  var $elm_community$typed_svg$TypedSvg$Events$simpleOn = function (name) {
      return function (msg) {
          return A2(
              $elm_community$typed_svg$TypedSvg$Events$on,
              name,
              $elm$virtual_dom$VirtualDom$Normal(
                  $elm$json$Json$Decode$succeed(msg)));
      };
  };
  var $elm_community$typed_svg$TypedSvg$Events$onClick = $elm_community$typed_svg$TypedSvg$Events$simpleOn('click');
  var $elm_community$typed_svg$TypedSvg$path = $elm_community$typed_svg$TypedSvg$Core$node('path');
  var $elm_community$typed_svg$TypedSvg$Attributes$strokeDasharray = $elm_community$typed_svg$TypedSvg$Core$attribute('stroke-dasharray');
  var $elm_community$typed_svg$TypedSvg$Attributes$strokeWidth = function (length) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'stroke-width',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$style = function (value) {
      return A2($elm_community$typed_svg$TypedSvg$Core$attribute, 'style', value);
  };
  var $elm_community$typed_svg$TypedSvg$title = $elm_community$typed_svg$TypedSvg$Core$node('title');
  var $folkertdev$elm_deque$Internal$empty = {front: _List_Nil, rear: _List_Nil, sizeF: 0, sizeR: 0};
  var $folkertdev$elm_deque$Deque$empty = $folkertdev$elm_deque$Deque$Deque($folkertdev$elm_deque$Internal$empty);
  var $folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath = {$: 'ClosePath'};
  var $folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc = function (a) {
      return {$: 'EllipticalArc', a: a};
  };
  var $folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo = function (a) {
      return {$: 'QuadraticBezierCurveTo', a: a};
  };
  var $folkertdev$one_true_path_experiment$LowLevel$Command$merge = F2(
      function (instruction1, instruction2) {
          var _v0 = _Utils_Tuple2(instruction1, instruction2);
          _v0$5:
          while (true) {
              switch (_v0.a.$) {
                  case 'LineTo':
                      if (_v0.b.$ === 'LineTo') {
                          var p1 = _v0.a.a;
                          var p2 = _v0.b.a;
                          return $elm$core$Result$Ok(
                              $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo(
                                  _Utils_ap(p1, p2)));
                      } else {
                          break _v0$5;
                      }
                  case 'CurveTo':
                      if (_v0.b.$ === 'CurveTo') {
                          var p1 = _v0.a.a;
                          var p2 = _v0.b.a;
                          return $elm$core$Result$Ok(
                              $folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo(
                                  _Utils_ap(p1, p2)));
                      } else {
                          break _v0$5;
                      }
                  case 'QuadraticBezierCurveTo':
                      if (_v0.b.$ === 'QuadraticBezierCurveTo') {
                          var p1 = _v0.a.a;
                          var p2 = _v0.b.a;
                          return $elm$core$Result$Ok(
                              $folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo(
                                  _Utils_ap(p1, p2)));
                      } else {
                          break _v0$5;
                      }
                  case 'EllipticalArc':
                      if (_v0.b.$ === 'EllipticalArc') {
                          var p1 = _v0.a.a;
                          var p2 = _v0.b.a;
                          return $elm$core$Result$Ok(
                              $folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc(
                                  _Utils_ap(p1, p2)));
                      } else {
                          break _v0$5;
                      }
                  default:
                      if (_v0.b.$ === 'ClosePath') {
                          var _v1 = _v0.a;
                          var _v2 = _v0.b;
                          return $elm$core$Result$Ok($folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath);
                      } else {
                          break _v0$5;
                      }
              }
          }
          return $elm$core$Result$Err(
              _Utils_Tuple2(instruction1, instruction2));
      });
  var $folkertdev$one_true_path_experiment$SubPath$compressHelper = function (drawtos) {
      var folder = F2(
          function (instruction, _v3) {
              var previous = _v3.a;
              var accum = _v3.b;
              var _v2 = A2($folkertdev$one_true_path_experiment$LowLevel$Command$merge, previous, instruction);
              if (_v2.$ === 'Ok') {
                  var merged = _v2.a;
                  return _Utils_Tuple2(merged, accum);
              } else {
                  return _Utils_Tuple2(
                      instruction,
                      A2($elm$core$List$cons, previous, accum));
              }
          });
      var _v0 = $folkertdev$elm_deque$Deque$toList(drawtos);
      if (!_v0.b) {
          return $folkertdev$elm_deque$Deque$empty;
      } else {
          var first = _v0.a;
          var rest = _v0.b;
          return $folkertdev$elm_deque$Deque$fromList(
              $elm$core$List$reverse(
                  function (_v1) {
                      var a = _v1.a;
                      var b = _v1.b;
                      return A2($elm$core$List$cons, a, b);
                  }(
                      A3(
                          $elm$core$List$foldl,
                          folder,
                          _Utils_Tuple2(first, _List_Nil),
                          rest))));
      }
  };
  var $folkertdev$one_true_path_experiment$SubPath$compress = function (subpath) {
      if (subpath.$ === 'Empty') {
          return $folkertdev$one_true_path_experiment$SubPath$Empty;
      } else {
          var data = subpath.a;
          return $folkertdev$one_true_path_experiment$SubPath$SubPath(
              _Utils_update(
                  data,
                  {
                      drawtos: $folkertdev$one_true_path_experiment$SubPath$compressHelper(data.drawtos)
                  }));
      }
  };
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$DecimalPlaces = function (a) {
      return {$: 'DecimalPlaces', a: a};
  };
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$decimalPlaces = $folkertdev$svg_path_lowlevel$Path$LowLevel$DecimalPlaces;
  var $folkertdev$one_true_path_experiment$SubPath$defaultConfig = {decimalPlaces: $elm$core$Maybe$Nothing, mergeAdjacent: false};
  var $folkertdev$one_true_path_experiment$SubPath$optionFolder = F2(
      function (option, config) {
          if (option.$ === 'DecimalPlaces') {
              var n = option.a;
              return _Utils_update(
                  config,
                  {
                      decimalPlaces: $elm$core$Maybe$Just(n)
                  });
          } else {
              return _Utils_update(
                  config,
                  {mergeAdjacent: true});
          }
      });
  var $elm$core$List$singleton = function (value) {
      return _List_fromArray(
          [value]);
  };
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute = {$: 'Absolute'};
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$ClosePath = {$: 'ClosePath'};
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$CurveTo = F2(
      function (a, b) {
          return {$: 'CurveTo', a: a, b: b};
      });
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$EllipticalArc = F2(
      function (a, b) {
          return {$: 'EllipticalArc', a: a, b: b};
      });
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$LineTo = F2(
      function (a, b) {
          return {$: 'LineTo', a: a, b: b};
      });
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$QuadraticBezierCurveTo = F2(
      function (a, b) {
          return {$: 'QuadraticBezierCurveTo', a: a, b: b};
      });
  var $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelDrawTo = function (drawto) {
      switch (drawto.$) {
          case 'LineTo':
              var coordinates = drawto.a;
              return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$LineTo, $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute, coordinates);
          case 'CurveTo':
              var coordinates = drawto.a;
              return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$CurveTo, $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute, coordinates);
          case 'QuadraticBezierCurveTo':
              var coordinates = drawto.a;
              return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$QuadraticBezierCurveTo, $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute, coordinates);
          case 'EllipticalArc':
              var _arguments = drawto.a;
              return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$EllipticalArc, $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute, _arguments);
          default:
              return $folkertdev$svg_path_lowlevel$Path$LowLevel$ClosePath;
      }
  };
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$MoveTo = F2(
      function (a, b) {
          return {$: 'MoveTo', a: a, b: b};
      });
  var $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelMoveTo = function (_v0) {
      var target = _v0.a;
      return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$MoveTo, $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute, target);
  };
  var $folkertdev$one_true_path_experiment$SubPath$toLowLevel = function (subpath) {
      if (subpath.$ === 'Empty') {
          return $elm$core$Maybe$Nothing;
      } else {
          var moveto = subpath.a.moveto;
          var drawtos = subpath.a.drawtos;
          return $elm$core$Maybe$Just(
              {
                  drawtos: A2(
                      $elm$core$List$map,
                      $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelDrawTo,
                      $folkertdev$elm_deque$Deque$toList(drawtos)),
                  moveto: $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelMoveTo(moveto)
              });
      }
  };
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$defaultConfig = {floatFormatter: $elm$core$String$fromFloat};
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$roundTo = F2(
      function (n, value) {
          if (!n) {
              return $elm$core$String$fromInt(
                  $elm$core$Basics$round(value));
          } else {
              var sign = (value < 0.0) ? '-' : '';
              var exp = A2($elm$core$Basics$pow, 10, n);
              var raised = $elm$core$Basics$abs(
                  $elm$core$Basics$round(value * exp));
              var decimals = raised % exp;
              return (!decimals) ? _Utils_ap(
                  sign,
                  $elm$core$String$fromInt((raised / exp) | 0)) : (sign + ($elm$core$String$fromInt((raised / exp) | 0) + ('.' + $elm$core$String$fromInt(decimals))));
          }
      });
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$optionFolder = F2(
      function (option, config) {
          var n = option.a;
          return _Utils_update(
              config,
              {
                  floatFormatter: $folkertdev$svg_path_lowlevel$Path$LowLevel$roundTo(n)
              });
      });
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$accumulateOptions = A2($elm$core$List$foldl, $folkertdev$svg_path_lowlevel$Path$LowLevel$optionFolder, $folkertdev$svg_path_lowlevel$Path$LowLevel$defaultConfig);
  var $elm$core$List$isEmpty = function (xs) {
      if (!xs.b) {
          return true;
      } else {
          return false;
      }
  };
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$isEmpty = function (command) {
      switch (command.$) {
          case 'LineTo':
              var mode = command.a;
              var coordinates = command.b;
              return $elm$core$List$isEmpty(coordinates);
          case 'Horizontal':
              var mode = command.a;
              var coordinates = command.b;
              return $elm$core$List$isEmpty(coordinates);
          case 'Vertical':
              var mode = command.a;
              var coordinates = command.b;
              return $elm$core$List$isEmpty(coordinates);
          case 'CurveTo':
              var mode = command.a;
              var coordinates = command.b;
              return $elm$core$List$isEmpty(coordinates);
          case 'SmoothCurveTo':
              var mode = command.a;
              var coordinates = command.b;
              return $elm$core$List$isEmpty(coordinates);
          case 'QuadraticBezierCurveTo':
              var mode = command.a;
              var coordinates = command.b;
              return $elm$core$List$isEmpty(coordinates);
          case 'SmoothQuadraticBezierCurveTo':
              var mode = command.a;
              var coordinates = command.b;
              return $elm$core$List$isEmpty(coordinates);
          case 'EllipticalArc':
              var mode = command.a;
              var _arguments = command.b;
              return $elm$core$List$isEmpty(_arguments);
          default:
              return false;
      }
  };
  var $elm$core$String$cons = _String_cons;
  var $elm$core$String$fromChar = function (_char) {
      return A2($elm$core$String$cons, _char, '');
  };
  var $elm$core$Char$toLower = _Char_toLower;
  var $elm$core$Char$toUpper = _Char_toUpper;
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter = F2(
      function (mode, character) {
          if (mode.$ === 'Absolute') {
              return $elm$core$String$fromChar(
                  $elm$core$Char$toUpper(character));
          } else {
              return $elm$core$String$fromChar(
                  $elm$core$Char$toLower(character));
          }
      });
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate = F2(
      function (config, _v0) {
          var x = _v0.a;
          var y = _v0.b;
          return config.floatFormatter(x) + (',' + config.floatFormatter(y));
      });
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2 = F2(
      function (config, _v0) {
          var c1 = _v0.a;
          var c2 = _v0.b;
          return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c1) + (' ' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c2));
      });
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate3 = F2(
      function (config, _v0) {
          var c1 = _v0.a;
          var c2 = _v0.b;
          var c3 = _v0.c;
          return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c1) + (' ' + (A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c2) + (' ' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c3))));
      });
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyEllipticalArcArgument = F2(
      function (config, _v0) {
          var radii = _v0.radii;
          var xAxisRotate = _v0.xAxisRotate;
          var arcFlag = _v0.arcFlag;
          var direction = _v0.direction;
          var target = _v0.target;
          var _v1 = $folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags(
              _Utils_Tuple2(arcFlag, direction));
          var arc = _v1.a;
          var sweep = _v1.b;
          return A2(
              $elm$core$String$join,
              ' ',
              _List_fromArray(
                  [
                      A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, radii),
                      $elm$core$String$fromFloat(xAxisRotate),
                      $elm$core$String$fromInt(arc),
                      $elm$core$String$fromInt(sweep),
                      A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, target)
                  ]));
      });
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyDrawTo = F2(
      function (config, command) {
          if ($folkertdev$svg_path_lowlevel$Path$LowLevel$isEmpty(command)) {
              return '';
          } else {
              switch (command.$) {
                  case 'LineTo':
                      var mode = command.a;
                      var coordinates = command.b;
                      return _Utils_ap(
                          A2(
                              $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
                              mode,
                              _Utils_chr('L')),
                          A2(
                              $elm$core$String$join,
                              ' ',
                              A2(
                                  $elm$core$List$map,
                                  $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate(config),
                                  coordinates)));
                  case 'Horizontal':
                      var mode = command.a;
                      var coordinates = command.b;
                      return $elm$core$List$isEmpty(coordinates) ? '' : _Utils_ap(
                          A2(
                              $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
                              mode,
                              _Utils_chr('H')),
                          A2(
                              $elm$core$String$join,
                              ' ',
                              A2($elm$core$List$map, $elm$core$String$fromFloat, coordinates)));
                  case 'Vertical':
                      var mode = command.a;
                      var coordinates = command.b;
                      return _Utils_ap(
                          A2(
                              $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
                              mode,
                              _Utils_chr('V')),
                          A2(
                              $elm$core$String$join,
                              ' ',
                              A2($elm$core$List$map, $elm$core$String$fromFloat, coordinates)));
                  case 'CurveTo':
                      var mode = command.a;
                      var coordinates = command.b;
                      return _Utils_ap(
                          A2(
                              $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
                              mode,
                              _Utils_chr('C')),
                          A2(
                              $elm$core$String$join,
                              ' ',
                              A2(
                                  $elm$core$List$map,
                                  $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate3(config),
                                  coordinates)));
                  case 'SmoothCurveTo':
                      var mode = command.a;
                      var coordinates = command.b;
                      return _Utils_ap(
                          A2(
                              $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
                              mode,
                              _Utils_chr('S')),
                          A2(
                              $elm$core$String$join,
                              ' ',
                              A2(
                                  $elm$core$List$map,
                                  $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2(config),
                                  coordinates)));
                  case 'QuadraticBezierCurveTo':
                      var mode = command.a;
                      var coordinates = command.b;
                      return _Utils_ap(
                          A2(
                              $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
                              mode,
                              _Utils_chr('Q')),
                          A2(
                              $elm$core$String$join,
                              ' ',
                              A2(
                                  $elm$core$List$map,
                                  $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2(config),
                                  coordinates)));
                  case 'SmoothQuadraticBezierCurveTo':
                      var mode = command.a;
                      var coordinates = command.b;
                      return _Utils_ap(
                          A2(
                              $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
                              mode,
                              _Utils_chr('T')),
                          A2(
                              $elm$core$String$join,
                              ' ',
                              A2(
                                  $elm$core$List$map,
                                  $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate(config),
                                  coordinates)));
                  case 'EllipticalArc':
                      var mode = command.a;
                      var _arguments = command.b;
                      return _Utils_ap(
                          A2(
                              $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
                              mode,
                              _Utils_chr('A')),
                          A2(
                              $elm$core$String$join,
                              ' ',
                              A2(
                                  $elm$core$List$map,
                                  $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyEllipticalArcArgument(config),
                                  _arguments)));
                  default:
                      return 'Z';
              }
          }
      });
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyMoveTo = F2(
      function (config, _v0) {
          var mode = _v0.a;
          var coordinate = _v0.b;
          if (mode.$ === 'Absolute') {
              return 'M' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, coordinate);
          } else {
              return 'm' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, coordinate);
          }
      });
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$toStringSubPath = F2(
      function (config, _v0) {
          var moveto = _v0.moveto;
          var drawtos = _v0.drawtos;
          return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyMoveTo, config, moveto) + (' ' + A2(
              $elm$core$String$join,
              ' ',
              A2(
                  $elm$core$List$map,
                  $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyDrawTo(config),
                  drawtos)));
      });
  var $folkertdev$svg_path_lowlevel$Path$LowLevel$toStringWith = F2(
      function (options, subpaths) {
          var config = $folkertdev$svg_path_lowlevel$Path$LowLevel$accumulateOptions(options);
          return A2(
              $elm$core$String$join,
              ' ',
              A2(
                  $elm$core$List$map,
                  $folkertdev$svg_path_lowlevel$Path$LowLevel$toStringSubPath(config),
                  subpaths));
      });
  var $folkertdev$one_true_path_experiment$SubPath$toStringWith = F2(
      function (options, subpath) {
          var config = A3($elm$core$List$foldl, $folkertdev$one_true_path_experiment$SubPath$optionFolder, $folkertdev$one_true_path_experiment$SubPath$defaultConfig, options);
          var lowLevelOptions = function () {
              var _v0 = config.decimalPlaces;
              if (_v0.$ === 'Nothing') {
                  return _List_Nil;
              } else {
                  var n = _v0.a;
                  return _List_fromArray(
                      [
                          $folkertdev$svg_path_lowlevel$Path$LowLevel$decimalPlaces(n)
                      ]);
              }
          }();
          return A2(
              $elm$core$Maybe$withDefault,
              '',
              A2(
                  $elm$core$Maybe$map,
                  A2(
                      $elm$core$Basics$composeL,
                      $folkertdev$svg_path_lowlevel$Path$LowLevel$toStringWith(lowLevelOptions),
                      $elm$core$List$singleton),
                  $folkertdev$one_true_path_experiment$SubPath$toLowLevel(
                      (config.mergeAdjacent ? $folkertdev$one_true_path_experiment$SubPath$compress : $elm$core$Basics$identity)(subpath))));
      });
  var $folkertdev$one_true_path_experiment$SubPath$toString = function (subpath) {
      return A2($folkertdev$one_true_path_experiment$SubPath$toStringWith, _List_Nil, subpath);
  };
  var $goyalarchit$elm_dagre$Render$StandardDrawers$svgDrawEdge = F2(
      function (edits, edgeAtrib) {
          var edge = edgeAtrib.edge;
          var edgeId = 'edge-' + ($elm$core$String$fromInt(edge.from) + ('-' + $elm$core$String$fromInt(edge.to)));
          var edgePathId = edgeId + '-path';
          var config = A3(
              $elm$core$List$foldl,
              F2(
                  function (f, a) {
                      return f(a);
                  }),
              $goyalarchit$elm_dagre$Render$StandardDrawers$defEdgeDrawerConfig,
              edits);
          var curve = function () {
              var pts = A3($goyalarchit$elm_dagre$Render$StandardDrawers$getAdjustedSrcAndTarget, edgeAtrib, 1.5, 1.5);
              var _v1 = config.linkStyle;
              if (_v1.$ === 'Spline') {
                  return A2($folkertdev$one_true_path_experiment$Curve$catmullRom, config.alpha, pts);
              } else {
                  return $folkertdev$one_true_path_experiment$Curve$linear(pts);
              }
          }();
          var parameterizedCurve = A2($folkertdev$one_true_path_experiment$SubPath$arcLengthParameterized, $goyalarchit$elm_dagre$Render$StandardDrawers$tolerance, curve);
          var gAtrib = function () {
              var _v0 = config.onClick;
              if (_v0.$ === 'Nothing') {
                  return _List_fromArray(
                      [
                          $elm_community$typed_svg$TypedSvg$Attributes$id(edgeId),
                          $elm_community$typed_svg$TypedSvg$Attributes$class(
                          _List_fromArray(
                              ['edge'])),
                          $elm_community$typed_svg$TypedSvg$Attributes$style(
                          config.style(edge))
                      ]);
              } else {
                  var f = _v0.a;
                  return _List_fromArray(
                      [
                          $elm_community$typed_svg$TypedSvg$Attributes$id(edgeId),
                          $elm_community$typed_svg$TypedSvg$Attributes$class(
                          _List_fromArray(
                              ['edge'])),
                          $elm_community$typed_svg$TypedSvg$Attributes$style(
                          config.style(edge)),
                          $elm_community$typed_svg$TypedSvg$Events$onClick(
                          f(edge)),
                          $elm_community$typed_svg$TypedSvg$Attributes$cursor($elm_community$typed_svg$TypedSvg$Types$CursorPointer)
                      ]);
              }
          }();
          return A2(
              $elm_community$typed_svg$TypedSvg$g,
              gAtrib,
              _List_fromArray(
                  [
                      A2(
                      $goyalarchit$elm_dagre$Render$StandardDrawers$arrowHeadDef,
                      config.arrowHead,
                      config.strokeColor(edge)),
                      A2(
                      $elm_community$typed_svg$TypedSvg$title,
                      _List_Nil,
                      _List_fromArray(
                          [
                              $elm_community$typed_svg$TypedSvg$Core$text(
                              config.title(edge))
                          ])),
                      A2(
                      $elm_community$typed_svg$TypedSvg$path,
                      _List_fromArray(
                          [
                              $elm_community$typed_svg$TypedSvg$Attributes$id(edgePathId),
                              $elm_community$typed_svg$TypedSvg$Attributes$d(
                              $folkertdev$one_true_path_experiment$SubPath$toString(curve)),
                              $elm_community$typed_svg$TypedSvg$Attributes$stroke(
                              $elm_community$typed_svg$TypedSvg$Types$Paint(
                                  config.strokeColor(edge))),
                              $elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
                              $elm_community$typed_svg$TypedSvg$Types$Px(
                                  config.strokeWidth(edge))),
                              $elm_community$typed_svg$TypedSvg$Attributes$strokeDasharray(
                              config.strokeDashArray(edge)),
                              $elm_community$typed_svg$TypedSvg$Attributes$fill($elm_community$typed_svg$TypedSvg$Types$PaintNone),
                              $elm_community$typed_svg$TypedSvg$Attributes$markerEnd(
                              $goyalarchit$elm_dagre$Render$StandardDrawers$arrowHeadId(config.arrowHead))
                          ]),
                      _List_Nil),
                      A5(
                      $goyalarchit$elm_dagre$Render$StandardDrawers$edgeLabelDrawer,
                      config.label(edge),
                      config.fontSize,
                      config.orientLabelAlongEdge,
                      edgePathId,
                      parameterizedCurve)
                  ]));
      });
  var $goyalarchit$elm_dagre$Render$StandardDrawers$Types$Ellipse = {$: 'Ellipse'};
  var $avh4$elm_color$Color$blue = A4($avh4$elm_color$Color$RgbaSpace, 52 / 255, 101 / 255, 164 / 255, 1.0);
  var $avh4$elm_color$Color$scaleFrom255 = function (c) {
      return c / 255;
  };
  var $avh4$elm_color$Color$rgb255 = F3(
      function (r, g, b) {
          return A4(
              $avh4$elm_color$Color$RgbaSpace,
              $avh4$elm_color$Color$scaleFrom255(r),
              $avh4$elm_color$Color$scaleFrom255(g),
              $avh4$elm_color$Color$scaleFrom255(b),
              1.0);
      });
  var $goyalarchit$elm_dagre$Render$StandardDrawers$defNodeDrawerConfig = function () {
      var f_ = function (_v4) {
          return '';
      };
      var f = function (n) {
          return $elm$core$String$fromInt(n.id);
      };
      return {
          fill: function (_v0) {
              return A3($avh4$elm_color$Color$rgb255, 178, 235, 242);
          },
          fontSize: 16,
          label: f,
          onClick: $elm$core$Maybe$Nothing,
          shape: function (_v1) {
              return $goyalarchit$elm_dagre$Render$StandardDrawers$Types$Ellipse;
          },
          strokeColor: function (_v2) {
              return $avh4$elm_color$Color$blue;
          },
          strokeDashArray: f_,
          strokeWidth: function (_v3) {
              return 1;
          },
          style: f_,
          title: f,
          xLabels: _List_Nil
      };
  }();
  var $elm_community$typed_svg$TypedSvg$circle = $elm_community$typed_svg$TypedSvg$Core$node('circle');
  var $elm_community$typed_svg$TypedSvg$Attributes$cx = function (length) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'cx',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$cy = function (length) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'cy',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
  };
  var $elm_community$typed_svg$TypedSvg$ellipse = $elm_community$typed_svg$TypedSvg$Core$node('ellipse');
  var $elm_community$typed_svg$TypedSvg$Attributes$height = function (length) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'height',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$r = function (length) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'r',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
  };
  var $elm_community$typed_svg$TypedSvg$rect = $elm_community$typed_svg$TypedSvg$Core$node('rect');
  var $elm_community$typed_svg$TypedSvg$Attributes$rx = function (length) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'rx',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$ry = function (length) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'ry',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$width = function (length) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'width',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$x = function (length) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'x',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
  };
  var $elm_community$typed_svg$TypedSvg$Attributes$y = function (length) {
      return A2(
          $elm_community$typed_svg$TypedSvg$Core$attribute,
          'y',
          $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
  };
  var $goyalarchit$elm_dagre$Render$StandardDrawers$nodeShapeDrawer = F2(
      function (config, nodeAtrib) {
          var width = nodeAtrib.width;
          var height = nodeAtrib.height;
          var d = A2($elm$core$Basics$max, width, height);
          var _v0 = nodeAtrib.coord;
          var posX = _v0.a;
          var posY = _v0.b;
          var _v1 = config.shape(nodeAtrib.node);
          switch (_v1.$) {
              case 'Circle':
                  return A2(
                      $elm_community$typed_svg$TypedSvg$circle,
                      _List_fromArray(
                          [
                              $elm_community$typed_svg$TypedSvg$Attributes$r(
                              $elm_community$typed_svg$TypedSvg$Types$Px(d / 2)),
                              $elm_community$typed_svg$TypedSvg$Attributes$stroke(
                              $elm_community$typed_svg$TypedSvg$Types$Paint(
                                  config.strokeColor(nodeAtrib.node))),
                              $elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
                              $elm_community$typed_svg$TypedSvg$Types$Px(
                                  config.strokeWidth(nodeAtrib.node))),
                              $elm_community$typed_svg$TypedSvg$Attributes$strokeDasharray(
                              config.strokeDashArray(nodeAtrib.node)),
                              $elm_community$typed_svg$TypedSvg$Attributes$fill(
                              $elm_community$typed_svg$TypedSvg$Types$Paint(
                                  config.fill(nodeAtrib.node))),
                              $elm_community$typed_svg$TypedSvg$Attributes$cx(
                              $elm_community$typed_svg$TypedSvg$Types$Px(posX)),
                              $elm_community$typed_svg$TypedSvg$Attributes$cy(
                              $elm_community$typed_svg$TypedSvg$Types$Px(posY))
                          ]),
                      _List_Nil);
              case 'Ellipse':
                  return A2(
                      $elm_community$typed_svg$TypedSvg$ellipse,
                      _List_fromArray(
                          [
                              $elm_community$typed_svg$TypedSvg$Attributes$rx(
                              $elm_community$typed_svg$TypedSvg$Types$Px(width / 2)),
                              $elm_community$typed_svg$TypedSvg$Attributes$ry(
                              $elm_community$typed_svg$TypedSvg$Types$Px(height / 2)),
                              $elm_community$typed_svg$TypedSvg$Attributes$stroke(
                              $elm_community$typed_svg$TypedSvg$Types$Paint(
                                  config.strokeColor(nodeAtrib.node))),
                              $elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
                              $elm_community$typed_svg$TypedSvg$Types$Px(
                                  config.strokeWidth(nodeAtrib.node))),
                              $elm_community$typed_svg$TypedSvg$Attributes$strokeDasharray(
                              config.strokeDashArray(nodeAtrib.node)),
                              $elm_community$typed_svg$TypedSvg$Attributes$fill(
                              $elm_community$typed_svg$TypedSvg$Types$Paint(
                                  config.fill(nodeAtrib.node))),
                              $elm_community$typed_svg$TypedSvg$Attributes$cx(
                              $elm_community$typed_svg$TypedSvg$Types$Px(posX)),
                              $elm_community$typed_svg$TypedSvg$Attributes$cy(
                              $elm_community$typed_svg$TypedSvg$Types$Px(posY))
                          ]),
                      _List_Nil);
              case 'Box':
                  return A2(
                      $elm_community$typed_svg$TypedSvg$rect,
                      _List_fromArray(
                          [
                              $elm_community$typed_svg$TypedSvg$Attributes$width(
                              $elm_community$typed_svg$TypedSvg$Types$Px(width)),
                              $elm_community$typed_svg$TypedSvg$Attributes$height(
                              $elm_community$typed_svg$TypedSvg$Types$Px(height)),
                              $elm_community$typed_svg$TypedSvg$Attributes$stroke(
                              $elm_community$typed_svg$TypedSvg$Types$Paint(
                                  config.strokeColor(nodeAtrib.node))),
                              $elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
                              $elm_community$typed_svg$TypedSvg$Types$Px(
                                  config.strokeWidth(nodeAtrib.node))),
                              $elm_community$typed_svg$TypedSvg$Attributes$strokeDasharray(
                              config.strokeDashArray(nodeAtrib.node)),
                              $elm_community$typed_svg$TypedSvg$Attributes$fill(
                              $elm_community$typed_svg$TypedSvg$Types$Paint(
                                  config.fill(nodeAtrib.node))),
                              $elm_community$typed_svg$TypedSvg$Attributes$x(
                              $elm_community$typed_svg$TypedSvg$Types$Px(posX - (width / 2))),
                              $elm_community$typed_svg$TypedSvg$Attributes$y(
                              $elm_community$typed_svg$TypedSvg$Types$Px(posY - (height / 2)))
                          ]),
                      _List_Nil);
              case 'RoundedBox':
                  var r = _v1.a;
                  return A2(
                      $elm_community$typed_svg$TypedSvg$rect,
                      _List_fromArray(
                          [
                              $elm_community$typed_svg$TypedSvg$Attributes$width(
                              $elm_community$typed_svg$TypedSvg$Types$Px(width)),
                              $elm_community$typed_svg$TypedSvg$Attributes$height(
                              $elm_community$typed_svg$TypedSvg$Types$Px(height)),
                              $elm_community$typed_svg$TypedSvg$Attributes$rx(
                              $elm_community$typed_svg$TypedSvg$Types$Px(r)),
                              $elm_community$typed_svg$TypedSvg$Attributes$stroke(
                              $elm_community$typed_svg$TypedSvg$Types$Paint(
                                  config.strokeColor(nodeAtrib.node))),
                              $elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
                              $elm_community$typed_svg$TypedSvg$Types$Px(
                                  config.strokeWidth(nodeAtrib.node))),
                              $elm_community$typed_svg$TypedSvg$Attributes$strokeDasharray(
                              config.strokeDashArray(nodeAtrib.node)),
                              $elm_community$typed_svg$TypedSvg$Attributes$fill(
                              $elm_community$typed_svg$TypedSvg$Types$Paint(
                                  config.fill(nodeAtrib.node))),
                              $elm_community$typed_svg$TypedSvg$Attributes$x(
                              $elm_community$typed_svg$TypedSvg$Types$Px(posX - (width / 2))),
                              $elm_community$typed_svg$TypedSvg$Attributes$y(
                              $elm_community$typed_svg$TypedSvg$Types$Px(posY - (height / 2)))
                          ]),
                      _List_Nil);
              default:
                  return A2($elm_community$typed_svg$TypedSvg$g, _List_Nil, _List_Nil);
          }
      });
  var $goyalarchit$elm_dagre$Render$StandardDrawers$xLabelsDrawer = F2(
      function (xLabelDrawers, nodeAtrib) {
          return A2(
              $elm_community$typed_svg$TypedSvg$g,
              _List_fromArray(
                  [
                      $elm_community$typed_svg$TypedSvg$Attributes$class(
                      _List_fromArray(
                          ['xlabels']))
                  ]),
              A2(
                  $elm$core$List$map,
                  function (f) {
                      return f(nodeAtrib);
                  },
                  xLabelDrawers));
      });
  var $goyalarchit$elm_dagre$Render$StandardDrawers$svgDrawNode = F2(
      function (edits, nodeAtrib) {
          var node = nodeAtrib.node;
          var nodeId = 'node-' + $elm$core$String$fromInt(node.id);
          var config = A3(
              $elm$core$List$foldl,
              F2(
                  function (f, a) {
                      return f(a);
                  }),
              $goyalarchit$elm_dagre$Render$StandardDrawers$defNodeDrawerConfig,
              edits);
          var gAtrib = function () {
              var _v1 = config.onClick;
              if (_v1.$ === 'Nothing') {
                  return _List_fromArray(
                      [
                          $elm_community$typed_svg$TypedSvg$Attributes$id(nodeId),
                          $elm_community$typed_svg$TypedSvg$Attributes$class(
                          _List_fromArray(
                              ['node'])),
                          $elm_community$typed_svg$TypedSvg$Attributes$style(
                          config.style(node))
                      ]);
              } else {
                  var f = _v1.a;
                  return _List_fromArray(
                      [
                          $elm_community$typed_svg$TypedSvg$Attributes$id(nodeId),
                          $elm_community$typed_svg$TypedSvg$Attributes$class(
                          _List_fromArray(
                              ['node'])),
                          $elm_community$typed_svg$TypedSvg$Attributes$style(
                          config.style(node)),
                          $elm_community$typed_svg$TypedSvg$Events$onClick(
                          f(node)),
                          $elm_community$typed_svg$TypedSvg$Attributes$cursor($elm_community$typed_svg$TypedSvg$Types$CursorPointer)
                      ]);
              }
          }();
          var lbl = config.label(node);
          var shapeAtrib = {fill: config.fill, shape: config.shape, strokeColor: config.strokeColor, strokeDashArray: config.strokeDashArray, strokeWidth: config.strokeWidth};
          var _v0 = nodeAtrib.coord;
          var posX = _v0.a;
          var posY = _v0.b;
          return A2(
              $elm_community$typed_svg$TypedSvg$g,
              gAtrib,
              _List_fromArray(
                  [
                      A2(
                      $elm_community$typed_svg$TypedSvg$title,
                      _List_Nil,
                      _List_fromArray(
                          [
                              $elm_community$typed_svg$TypedSvg$Core$text(
                              config.title(node))
                          ])),
                      A2($goyalarchit$elm_dagre$Render$StandardDrawers$nodeShapeDrawer, shapeAtrib, nodeAtrib),
                      A3(
                      $goyalarchit$elm_dagre$Render$StandardDrawers$centeredText,
                      lbl,
                      config.fontSize,
                      _Utils_Tuple2(posX, posY)),
                      A2($goyalarchit$elm_dagre$Render$StandardDrawers$xLabelsDrawer, config.xLabels, nodeAtrib)
                  ]));
      });
  var $goyalarchit$elm_dagre$Render$defDrawConfig = {
      edgeDrawer: $goyalarchit$elm_dagre$Render$StandardDrawers$svgDrawEdge(_List_Nil),
      id: 'graph-0',
      nodeDrawer: $goyalarchit$elm_dagre$Render$StandardDrawers$svgDrawNode(_List_Nil),
      style: ''
  };
  var $goyalarchit$elm_dagre$Dagre$Attributes$TB = {$: 'TB'};
  var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
  var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
  var $goyalarchit$elm_dagre$Dagre$defaultConfig = {edgeSep: 10, height: 32, heightDict: $elm$core$Dict$empty, marginX: 20, marginY: 20, nodeSep: 50, rankDir: $goyalarchit$elm_dagre$Dagre$Attributes$TB, rankSep: 75, width: 32, widthDict: $elm$core$Dict$empty};
  var $goyalarchit$elm_dagre$Render$Types$EdgeAttributes = F6(
      function (edge, source, target, controlPts, sourceDimensions, targetDimensions) {
          return {controlPts: controlPts, edge: edge, source: source, sourceDimensions: sourceDimensions, target: target, targetDimensions: targetDimensions};
      });
  var $elm$core$Basics$compare = _Utils_compare;
  var $elm$core$Dict$get = F2(
      function (targetKey, dict) {
          get:
          while (true) {
              if (dict.$ === 'RBEmpty_elm_builtin') {
                  return $elm$core$Maybe$Nothing;
              } else {
                  var key = dict.b;
                  var value = dict.c;
                  var left = dict.d;
                  var right = dict.e;
                  var _v1 = A2($elm$core$Basics$compare, targetKey, key);
                  switch (_v1.$) {
                      case 'LT':
                          var $temp$targetKey = targetKey,
                              $temp$dict = left;
                          targetKey = $temp$targetKey;
                          dict = $temp$dict;
                          continue get;
                      case 'EQ':
                          return $elm$core$Maybe$Just(value);
                      default:
                          var $temp$targetKey = targetKey,
                              $temp$dict = right;
                          targetKey = $temp$targetKey;
                          dict = $temp$dict;
                          continue get;
                  }
              }
          }
      });
  var $goyalarchit$elm_dagre$Render$edgeDrawing = F5(
      function (edge_, drawEdge_, coordDict, controlPointsDict, config) {
          var getWidth = function (n) {
              return A2(
                  $elm$core$Maybe$withDefault,
                  config.width,
                  A2($elm$core$Dict$get, n, config.widthDict));
          };
          var getHeight = function (n) {
              return A2(
                  $elm$core$Maybe$withDefault,
                  config.height,
                  A2($elm$core$Dict$get, n, config.heightDict));
          };
          var getCoords = function (p) {
              return A2(
                  $elm$core$Maybe$withDefault,
                  _Utils_Tuple2(-10, -10),
                  A2($elm$core$Dict$get, p, coordDict));
          };
          var sourcePos = getCoords(edge_.from);
          var targetPos = getCoords(edge_.to);
          var dimensions = function (n) {
              return _Utils_Tuple2(
                  getWidth(n),
                  getHeight(n));
          };
          var ctrlPts = A2(
              $elm$core$List$map,
              getCoords,
              A2(
                  $elm$core$Maybe$withDefault,
                  _List_Nil,
                  A2(
                      $elm$core$Dict$get,
                      _Utils_Tuple2(edge_.from, edge_.to),
                      controlPointsDict)));
          return drawEdge_(
              A6(
                  $goyalarchit$elm_dagre$Render$Types$EdgeAttributes,
                  edge_,
                  sourcePos,
                  targetPos,
                  ctrlPts,
                  dimensions(edge_.from),
                  dimensions(edge_.to)));
      });
  var $elm_community$intdict$IntDict$foldl = F3(
      function (f, acc, dict) {
          foldl:
          while (true) {
              switch (dict.$) {
                  case 'Empty':
                      return acc;
                  case 'Leaf':
                      var l = dict.a;
                      return A3(f, l.key, l.value, acc);
                  default:
                      var i = dict.a;
                      var $temp$f = f,
                          $temp$acc = A3($elm_community$intdict$IntDict$foldl, f, acc, i.left),
                          $temp$dict = i.right;
                      f = $temp$f;
                      acc = $temp$acc;
                      dict = $temp$dict;
                      continue foldl;
              }
          }
      });
  var $elm_community$graph$Graph$unGraph = function (graph) {
      var rep = graph.a;
      return rep;
  };
  var $elm_community$graph$Graph$edges = function (graph) {
      var flippedFoldl = F3(
          function (f, dict, list) {
              return A3($elm_community$intdict$IntDict$foldl, f, list, dict);
          });
      var prependEdges = F2(
          function (node1, ctx) {
              return A2(
                  flippedFoldl,
                  F2(
                      function (node2, e) {
                          return $elm$core$List$cons(
                              {from: node1, label: e, to: node2});
                      }),
                  ctx.outgoing);
          });
      return A3(
          flippedFoldl,
          prependEdges,
          $elm_community$graph$Graph$unGraph(graph),
          _List_Nil);
  };
  var $goyalarchit$elm_dagre$Render$Types$NodeAttributes = F4(
      function (node, coord, width, height) {
          return {coord: coord, height: height, node: node, width: width};
      });
  var $goyalarchit$elm_dagre$Render$nodeDrawing = F4(
      function (node_, drawNode_, coordDict, config) {
          var w = A2(
              $elm$core$Maybe$withDefault,
              config.width,
              A2($elm$core$Dict$get, node_.id, config.widthDict));
          var pos = A2(
              $elm$core$Maybe$withDefault,
              _Utils_Tuple2(-10, -10),
              A2($elm$core$Dict$get, node_.id, coordDict));
          var h = A2(
              $elm$core$Maybe$withDefault,
              config.height,
              A2($elm$core$Dict$get, node_.id, config.heightDict));
          return drawNode_(
              A4($goyalarchit$elm_dagre$Render$Types$NodeAttributes, node_, pos, w, h));
      });
  var $elm_community$intdict$IntDict$foldr = F3(
      function (f, acc, dict) {
          foldr:
          while (true) {
              switch (dict.$) {
                  case 'Empty':
                      return acc;
                  case 'Leaf':
                      var l = dict.a;
                      return A3(f, l.key, l.value, acc);
                  default:
                      var i = dict.a;
                      var $temp$f = f,
                          $temp$acc = A3($elm_community$intdict$IntDict$foldr, f, acc, i.right),
                          $temp$dict = i.left;
                      f = $temp$f;
                      acc = $temp$acc;
                      dict = $temp$dict;
                      continue foldr;
              }
          }
      });
  var $elm_community$intdict$IntDict$values = function (dict) {
      return A3(
          $elm_community$intdict$IntDict$foldr,
          F3(
              function (key, value, valueList) {
                  return A2($elm$core$List$cons, value, valueList);
              }),
          _List_Nil,
          dict);
  };
  var $elm_community$graph$Graph$nodes = A2(
      $elm$core$Basics$composeR,
      $elm_community$graph$Graph$unGraph,
      A2(
          $elm$core$Basics$composeR,
          $elm_community$intdict$IntDict$values,
          $elm$core$List$map(
              function ($) {
                  return $.node;
              })));
  var $elm_community$list_extra$List$Extra$findIndexHelp = F3(
      function (index, predicate, list) {
          findIndexHelp:
          while (true) {
              if (!list.b) {
                  return $elm$core$Maybe$Nothing;
              } else {
                  var x = list.a;
                  var xs = list.b;
                  if (predicate(x)) {
                      return $elm$core$Maybe$Just(index);
                  } else {
                      var $temp$index = index + 1,
                          $temp$predicate = predicate,
                          $temp$list = xs;
                      index = $temp$index;
                      predicate = $temp$predicate;
                      list = $temp$list;
                      continue findIndexHelp;
                  }
              }
          }
      });
  var $elm_community$list_extra$List$Extra$findIndex = $elm_community$list_extra$List$Extra$findIndexHelp(0);
  var $elm$core$List$any = F2(
      function (isOkay, list) {
          any:
          while (true) {
              if (!list.b) {
                  return false;
              } else {
                  var x = list.a;
                  var xs = list.b;
                  if (isOkay(x)) {
                      return true;
                  } else {
                      var $temp$isOkay = isOkay,
                          $temp$list = xs;
                      isOkay = $temp$isOkay;
                      list = $temp$list;
                      continue any;
                  }
              }
          }
      });
  var $elm$core$List$member = F2(
      function (x, xs) {
          return A2(
              $elm$core$List$any,
              function (a) {
                  return _Utils_eq(a, x);
              },
              xs);
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$getRank = F2(
      function (nodeId, layers) {
          var _v0 = A2(
              $elm_community$list_extra$List$Extra$findIndex,
              $elm$core$List$member(nodeId),
              layers);
          if (_v0.$ === 'Just') {
              var x = _v0.a;
              return x;
          } else {
              return -1;
          }
      });
  var $elm_community$list_extra$List$Extra$indexedFoldl = F3(
      function (func, acc, list) {
          var step = F2(
              function (x, _v0) {
                  var i = _v0.a;
                  var thisAcc = _v0.b;
                  return _Utils_Tuple2(
                      i + 1,
                      A3(func, i, x, thisAcc));
              });
          return A3(
              $elm$core$List$foldl,
              step,
              _Utils_Tuple2(0, acc),
              list).b;
      });
  var $elm_community$list_extra$List$Extra$updateAt = F3(
      function (index, fn, list) {
          if (index < 0) {
              return list;
          } else {
              var tail = A2($elm$core$List$drop, index, list);
              if (tail.b) {
                  var x = tail.a;
                  var xs = tail.b;
                  return _Utils_ap(
                      A2($elm$core$List$take, index, list),
                      A2(
                          $elm$core$List$cons,
                          fn(x),
                          xs));
              } else {
                  return list;
              }
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Normalize$insertKNodesIntoKSubsequentLayers = F3(
      function (rankLayers, startRank, dummyNodes) {
          return A3(
              $elm_community$list_extra$List$Extra$indexedFoldl,
              F3(
                  function (p, e, layers) {
                      return A3(
                          $elm_community$list_extra$List$Extra$updateAt,
                          startRank + p,
                          function (layer) {
                              return A2(
                                  $elm$core$List$append,
                                  layer,
                                  _List_fromArray(
                                      [e]));
                          },
                          layers);
                  }),
              rankLayers,
              dummyNodes);
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$getEdgesFromPath = function (path) {
      var tos = A2($elm$core$List$drop, 1, path);
      var froms = A2(
          $elm$core$List$take,
          $elm$core$List$length(path) - 1,
          path);
      return A3(
          $elm$core$List$map2,
          F2(
              function (from, to) {
                  return _Utils_Tuple2(from, to);
              }),
          froms,
          tos);
  };
  var $elm_community$list_extra$List$Extra$reverseAppend = F2(
      function (list1, list2) {
          return A3($elm$core$List$foldl, $elm$core$List$cons, list2, list1);
      });
  var $elm_community$list_extra$List$Extra$removeHelp = F4(
      function (list, x, xs, previousElements) {
          removeHelp:
          while (true) {
              if (!xs.b) {
                  return list;
              } else {
                  var y = xs.a;
                  var ys = xs.b;
                  if (_Utils_eq(x, y)) {
                      return A2($elm_community$list_extra$List$Extra$reverseAppend, previousElements, ys);
                  } else {
                      var $temp$list = list,
                          $temp$x = x,
                          $temp$xs = ys,
                          $temp$previousElements = A2($elm$core$List$cons, y, previousElements);
                      list = $temp$list;
                      x = $temp$x;
                      xs = $temp$xs;
                      previousElements = $temp$previousElements;
                      continue removeHelp;
                  }
              }
          }
      });
  var $elm_community$list_extra$List$Extra$remove = F2(
      function (x, xs) {
          return A4($elm_community$list_extra$List$Extra$removeHelp, xs, x, xs, _List_Nil);
      });
  var $goyalarchit$elm_dagre$Dagre$Normalize$splitEdgeAndUpdateEdges = F3(
      function (_v0, dummyNodes, edges) {
          var from = _v0.a;
          var to = _v0.b;
          var splitPath = $elm$core$List$concat(
              _List_fromArray(
                  [
                      _List_fromArray(
                      [from]),
                      dummyNodes,
                      _List_fromArray(
                      [to])
                  ]));
          var splitEdges = $goyalarchit$elm_dagre$Dagre$Utils$getEdgesFromPath(splitPath);
          var removedFromEdges = A2(
              $elm_community$list_extra$List$Extra$remove,
              _Utils_Tuple2(from, to),
              edges);
          return A2($elm$core$List$append, removedFromEdges, splitEdges);
      });
  var $elm$core$Dict$Black = {$: 'Black'};
  var $elm$core$Dict$RBNode_elm_builtin = F5(
      function (a, b, c, d, e) {
          return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
      });
  var $elm$core$Dict$Red = {$: 'Red'};
  var $elm$core$Dict$balance = F5(
      function (color, key, value, left, right) {
          if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
              var _v1 = right.a;
              var rK = right.b;
              var rV = right.c;
              var rLeft = right.d;
              var rRight = right.e;
              if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
                  var _v3 = left.a;
                  var lK = left.b;
                  var lV = left.c;
                  var lLeft = left.d;
                  var lRight = left.e;
                  return A5(
                      $elm$core$Dict$RBNode_elm_builtin,
                      $elm$core$Dict$Red,
                      key,
                      value,
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
              } else {
                  return A5(
                      $elm$core$Dict$RBNode_elm_builtin,
                      color,
                      rK,
                      rV,
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
                      rRight);
              }
          } else {
              if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
                  var _v5 = left.a;
                  var lK = left.b;
                  var lV = left.c;
                  var _v6 = left.d;
                  var _v7 = _v6.a;
                  var llK = _v6.b;
                  var llV = _v6.c;
                  var llLeft = _v6.d;
                  var llRight = _v6.e;
                  var lRight = left.e;
                  return A5(
                      $elm$core$Dict$RBNode_elm_builtin,
                      $elm$core$Dict$Red,
                      lK,
                      lV,
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
              } else {
                  return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
              }
          }
      });
  var $elm$core$Dict$insertHelp = F3(
      function (key, value, dict) {
          if (dict.$ === 'RBEmpty_elm_builtin') {
              return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
          } else {
              var nColor = dict.a;
              var nKey = dict.b;
              var nValue = dict.c;
              var nLeft = dict.d;
              var nRight = dict.e;
              var _v1 = A2($elm$core$Basics$compare, key, nKey);
              switch (_v1.$) {
                  case 'LT':
                      return A5(
                          $elm$core$Dict$balance,
                          nColor,
                          nKey,
                          nValue,
                          A3($elm$core$Dict$insertHelp, key, value, nLeft),
                          nRight);
                  case 'EQ':
                      return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
                  default:
                      return A5(
                          $elm$core$Dict$balance,
                          nColor,
                          nKey,
                          nValue,
                          nLeft,
                          A3($elm$core$Dict$insertHelp, key, value, nRight));
              }
          }
      });
  var $elm$core$Dict$insert = F3(
      function (key, value, dict) {
          var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
          if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
              var _v1 = _v0.a;
              var k = _v0.b;
              var v = _v0.c;
              var l = _v0.d;
              var r = _v0.e;
              return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
          } else {
              var x = _v0;
              return x;
          }
      });
  var $elm$core$Dict$getMin = function (dict) {
      getMin:
      while (true) {
          if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
              var left = dict.d;
              var $temp$dict = left;
              dict = $temp$dict;
              continue getMin;
          } else {
              return dict;
          }
      }
  };
  var $elm$core$Dict$moveRedLeft = function (dict) {
      if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
          if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
              var clr = dict.a;
              var k = dict.b;
              var v = dict.c;
              var _v1 = dict.d;
              var lClr = _v1.a;
              var lK = _v1.b;
              var lV = _v1.c;
              var lLeft = _v1.d;
              var lRight = _v1.e;
              var _v2 = dict.e;
              var rClr = _v2.a;
              var rK = _v2.b;
              var rV = _v2.c;
              var rLeft = _v2.d;
              var _v3 = rLeft.a;
              var rlK = rLeft.b;
              var rlV = rLeft.c;
              var rlL = rLeft.d;
              var rlR = rLeft.e;
              var rRight = _v2.e;
              return A5(
                  $elm$core$Dict$RBNode_elm_builtin,
                  $elm$core$Dict$Red,
                  rlK,
                  rlV,
                  A5(
                      $elm$core$Dict$RBNode_elm_builtin,
                      $elm$core$Dict$Black,
                      k,
                      v,
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
                      rlL),
                  A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
          } else {
              var clr = dict.a;
              var k = dict.b;
              var v = dict.c;
              var _v4 = dict.d;
              var lClr = _v4.a;
              var lK = _v4.b;
              var lV = _v4.c;
              var lLeft = _v4.d;
              var lRight = _v4.e;
              var _v5 = dict.e;
              var rClr = _v5.a;
              var rK = _v5.b;
              var rV = _v5.c;
              var rLeft = _v5.d;
              var rRight = _v5.e;
              if (clr.$ === 'Black') {
                  return A5(
                      $elm$core$Dict$RBNode_elm_builtin,
                      $elm$core$Dict$Black,
                      k,
                      v,
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
              } else {
                  return A5(
                      $elm$core$Dict$RBNode_elm_builtin,
                      $elm$core$Dict$Black,
                      k,
                      v,
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
              }
          }
      } else {
          return dict;
      }
  };
  var $elm$core$Dict$moveRedRight = function (dict) {
      if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
          if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
              var clr = dict.a;
              var k = dict.b;
              var v = dict.c;
              var _v1 = dict.d;
              var lClr = _v1.a;
              var lK = _v1.b;
              var lV = _v1.c;
              var _v2 = _v1.d;
              var _v3 = _v2.a;
              var llK = _v2.b;
              var llV = _v2.c;
              var llLeft = _v2.d;
              var llRight = _v2.e;
              var lRight = _v1.e;
              var _v4 = dict.e;
              var rClr = _v4.a;
              var rK = _v4.b;
              var rV = _v4.c;
              var rLeft = _v4.d;
              var rRight = _v4.e;
              return A5(
                  $elm$core$Dict$RBNode_elm_builtin,
                  $elm$core$Dict$Red,
                  lK,
                  lV,
                  A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
                  A5(
                      $elm$core$Dict$RBNode_elm_builtin,
                      $elm$core$Dict$Black,
                      k,
                      v,
                      lRight,
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
          } else {
              var clr = dict.a;
              var k = dict.b;
              var v = dict.c;
              var _v5 = dict.d;
              var lClr = _v5.a;
              var lK = _v5.b;
              var lV = _v5.c;
              var lLeft = _v5.d;
              var lRight = _v5.e;
              var _v6 = dict.e;
              var rClr = _v6.a;
              var rK = _v6.b;
              var rV = _v6.c;
              var rLeft = _v6.d;
              var rRight = _v6.e;
              if (clr.$ === 'Black') {
                  return A5(
                      $elm$core$Dict$RBNode_elm_builtin,
                      $elm$core$Dict$Black,
                      k,
                      v,
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
              } else {
                  return A5(
                      $elm$core$Dict$RBNode_elm_builtin,
                      $elm$core$Dict$Black,
                      k,
                      v,
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
                      A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
              }
          }
      } else {
          return dict;
      }
  };
  var $elm$core$Dict$removeHelpPrepEQGT = F7(
      function (targetKey, dict, color, key, value, left, right) {
          if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
              var _v1 = left.a;
              var lK = left.b;
              var lV = left.c;
              var lLeft = left.d;
              var lRight = left.e;
              return A5(
                  $elm$core$Dict$RBNode_elm_builtin,
                  color,
                  lK,
                  lV,
                  lLeft,
                  A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
          } else {
              _v2$2:
              while (true) {
                  if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
                      if (right.d.$ === 'RBNode_elm_builtin') {
                          if (right.d.a.$ === 'Black') {
                              var _v3 = right.a;
                              var _v4 = right.d;
                              var _v5 = _v4.a;
                              return $elm$core$Dict$moveRedRight(dict);
                          } else {
                              break _v2$2;
                          }
                      } else {
                          var _v6 = right.a;
                          var _v7 = right.d;
                          return $elm$core$Dict$moveRedRight(dict);
                      }
                  } else {
                      break _v2$2;
                  }
              }
              return dict;
          }
      });
  var $elm$core$Dict$removeMin = function (dict) {
      if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
          var color = dict.a;
          var key = dict.b;
          var value = dict.c;
          var left = dict.d;
          var lColor = left.a;
          var lLeft = left.d;
          var right = dict.e;
          if (lColor.$ === 'Black') {
              if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
                  var _v3 = lLeft.a;
                  return A5(
                      $elm$core$Dict$RBNode_elm_builtin,
                      color,
                      key,
                      value,
                      $elm$core$Dict$removeMin(left),
                      right);
              } else {
                  var _v4 = $elm$core$Dict$moveRedLeft(dict);
                  if (_v4.$ === 'RBNode_elm_builtin') {
                      var nColor = _v4.a;
                      var nKey = _v4.b;
                      var nValue = _v4.c;
                      var nLeft = _v4.d;
                      var nRight = _v4.e;
                      return A5(
                          $elm$core$Dict$balance,
                          nColor,
                          nKey,
                          nValue,
                          $elm$core$Dict$removeMin(nLeft),
                          nRight);
                  } else {
                      return $elm$core$Dict$RBEmpty_elm_builtin;
                  }
              }
          } else {
              return A5(
                  $elm$core$Dict$RBNode_elm_builtin,
                  color,
                  key,
                  value,
                  $elm$core$Dict$removeMin(left),
                  right);
          }
      } else {
          return $elm$core$Dict$RBEmpty_elm_builtin;
      }
  };
  var $elm$core$Dict$removeHelp = F2(
      function (targetKey, dict) {
          if (dict.$ === 'RBEmpty_elm_builtin') {
              return $elm$core$Dict$RBEmpty_elm_builtin;
          } else {
              var color = dict.a;
              var key = dict.b;
              var value = dict.c;
              var left = dict.d;
              var right = dict.e;
              if (_Utils_cmp(targetKey, key) < 0) {
                  if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
                      var _v4 = left.a;
                      var lLeft = left.d;
                      if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
                          var _v6 = lLeft.a;
                          return A5(
                              $elm$core$Dict$RBNode_elm_builtin,
                              color,
                              key,
                              value,
                              A2($elm$core$Dict$removeHelp, targetKey, left),
                              right);
                      } else {
                          var _v7 = $elm$core$Dict$moveRedLeft(dict);
                          if (_v7.$ === 'RBNode_elm_builtin') {
                              var nColor = _v7.a;
                              var nKey = _v7.b;
                              var nValue = _v7.c;
                              var nLeft = _v7.d;
                              var nRight = _v7.e;
                              return A5(
                                  $elm$core$Dict$balance,
                                  nColor,
                                  nKey,
                                  nValue,
                                  A2($elm$core$Dict$removeHelp, targetKey, nLeft),
                                  nRight);
                          } else {
                              return $elm$core$Dict$RBEmpty_elm_builtin;
                          }
                      }
                  } else {
                      return A5(
                          $elm$core$Dict$RBNode_elm_builtin,
                          color,
                          key,
                          value,
                          A2($elm$core$Dict$removeHelp, targetKey, left),
                          right);
                  }
              } else {
                  return A2(
                      $elm$core$Dict$removeHelpEQGT,
                      targetKey,
                      A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
              }
          }
      });
  var $elm$core$Dict$removeHelpEQGT = F2(
      function (targetKey, dict) {
          if (dict.$ === 'RBNode_elm_builtin') {
              var color = dict.a;
              var key = dict.b;
              var value = dict.c;
              var left = dict.d;
              var right = dict.e;
              if (_Utils_eq(targetKey, key)) {
                  var _v1 = $elm$core$Dict$getMin(right);
                  if (_v1.$ === 'RBNode_elm_builtin') {
                      var minKey = _v1.b;
                      var minValue = _v1.c;
                      return A5(
                          $elm$core$Dict$balance,
                          color,
                          minKey,
                          minValue,
                          left,
                          $elm$core$Dict$removeMin(right));
                  } else {
                      return $elm$core$Dict$RBEmpty_elm_builtin;
                  }
              } else {
                  return A5(
                      $elm$core$Dict$balance,
                      color,
                      key,
                      value,
                      left,
                      A2($elm$core$Dict$removeHelp, targetKey, right));
              }
          } else {
              return $elm$core$Dict$RBEmpty_elm_builtin;
          }
      });
  var $elm$core$Dict$remove = F2(
      function (key, dict) {
          var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
          if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
              var _v1 = _v0.a;
              var k = _v0.b;
              var v = _v0.c;
              var l = _v0.d;
              var r = _v0.e;
              return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
          } else {
              var x = _v0;
              return x;
          }
      });
  var $elm$core$Dict$update = F3(
      function (targetKey, alter, dictionary) {
          var _v0 = alter(
              A2($elm$core$Dict$get, targetKey, dictionary));
          if (_v0.$ === 'Just') {
              var value = _v0.a;
              return A3($elm$core$Dict$insert, targetKey, value, dictionary);
          } else {
              return A2($elm$core$Dict$remove, targetKey, dictionary);
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Normalize$checkAndSplitMultiSpanEdge = F2(
      function (_v0, _v1) {
          var from = _v0.a;
          var to = _v0.b;
          var _v2 = _v1.a;
          var rankLayers = _v2.a;
          var dummyId = _v2.b;
          var _v3 = _v1.b;
          var edges = _v3.a;
          var controlPoints = _v3.b;
          var toRank = A2($goyalarchit$elm_dagre$Dagre$Utils$getRank, to, rankLayers);
          var fromRank = A2($goyalarchit$elm_dagre$Dagre$Utils$getRank, from, rankLayers);
          if ((toRank - fromRank) > 1) {
              var newDummyId = ((dummyId + toRank) - fromRank) - 1;
              var dummyNodes = A2($elm$core$List$range, dummyId, newDummyId - 1);
              var newControlPoints = A3(
                  $elm$core$Dict$update,
                  _Utils_Tuple2(from, to),
                  $elm$core$Maybe$map(
                      function (_v4) {
                          return dummyNodes;
                      }),
                  controlPoints);
              var newEdges = A3(
                  $goyalarchit$elm_dagre$Dagre$Normalize$splitEdgeAndUpdateEdges,
                  _Utils_Tuple2(from, to),
                  dummyNodes,
                  edges);
              var newRankLayers = A3($goyalarchit$elm_dagre$Dagre$Normalize$insertKNodesIntoKSubsequentLayers, rankLayers, fromRank + 1, dummyNodes);
              return _Utils_Tuple2(
                  _Utils_Tuple2(newRankLayers, newDummyId),
                  _Utils_Tuple2(newEdges, newControlPoints));
          } else {
              return _Utils_Tuple2(
                  _Utils_Tuple2(rankLayers, dummyId),
                  _Utils_Tuple2(edges, controlPoints));
          }
      });
  var $elm$core$Dict$fromList = function (assocs) {
      return A3(
          $elm$core$List$foldl,
          F2(
              function (_v0, dict) {
                  var key = _v0.a;
                  var value = _v0.b;
                  return A3($elm$core$Dict$insert, key, value, dict);
              }),
          $elm$core$Dict$empty,
          assocs);
  };
  var $elm$core$List$maximum = function (list) {
      if (list.b) {
          var x = list.a;
          var xs = list.b;
          return $elm$core$Maybe$Just(
              A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
      } else {
          return $elm$core$Maybe$Nothing;
      }
  };
  var $goyalarchit$elm_dagre$Dagre$Normalize$addDummyNodesAndSplitEdges = function (_v0) {
      var rankLayers = _v0.a;
      var edges = _v0.b;
      var initDummyId = function () {
          var _v4 = $elm$core$List$maximum(
              $elm$core$List$concat(rankLayers));
          if (_v4.$ === 'Just') {
              var x = _v4.a;
              return x + 1;
          } else {
              return 1;
          }
      }();
      var initControlPoints = $elm$core$Dict$fromList(
          A2(
              $elm$core$List$map,
              function (e) {
                  return _Utils_Tuple2(e, _List_Nil);
              },
              edges));
      var _v1 = A3(
          $elm$core$List$foldl,
          $goyalarchit$elm_dagre$Dagre$Normalize$checkAndSplitMultiSpanEdge,
          _Utils_Tuple2(
              _Utils_Tuple2(rankLayers, initDummyId),
              _Utils_Tuple2(edges, initControlPoints)),
          edges);
      var _v2 = _v1.a;
      var newRankLayers = _v2.a;
      var _v3 = _v1.b;
      var newEdges = _v3.a;
      var newControlPoints = _v3.b;
      return _Utils_Tuple2(
          _Utils_Tuple2(newRankLayers, newEdges),
          newControlPoints);
  };
  var $elm_community$graph$Graph$crashHack = function (msg) {
      crashHack:
      while (true) {
          var $temp$msg = msg;
          msg = $temp$msg;
          continue crashHack;
      }
  };
  var $elm$core$Maybe$andThen = F2(
      function (callback, maybeValue) {
          if (maybeValue.$ === 'Just') {
              var value = maybeValue.a;
              return callback(value);
          } else {
              return $elm$core$Maybe$Nothing;
          }
      });
  var $elm_community$graph$Graph$get = function (nodeId) {
      return A2(
          $elm$core$Basics$composeR,
          $elm_community$graph$Graph$unGraph,
          $elm_community$intdict$IntDict$get(nodeId));
  };
  var $elm_community$intdict$IntDict$findMax = function (dict) {
      findMax:
      while (true) {
          switch (dict.$) {
              case 'Empty':
                  return $elm$core$Maybe$Nothing;
              case 'Leaf':
                  var l = dict.a;
                  return $elm$core$Maybe$Just(
                      _Utils_Tuple2(l.key, l.value));
              default:
                  var i = dict.a;
                  var $temp$dict = i.right;
                  dict = $temp$dict;
                  continue findMax;
          }
      }
  };
  var $elm_community$intdict$IntDict$findMin = function (dict) {
      findMin:
      while (true) {
          switch (dict.$) {
              case 'Empty':
                  return $elm$core$Maybe$Nothing;
              case 'Leaf':
                  var l = dict.a;
                  return $elm$core$Maybe$Just(
                      _Utils_Tuple2(l.key, l.value));
              default:
                  var i = dict.a;
                  var $temp$dict = i.left;
                  dict = $temp$dict;
                  continue findMin;
          }
      }
  };
  var $elm_community$graph$Graph$nodeIdRange = function (graph) {
      return A2(
          $elm$core$Maybe$andThen,
          function (_v0) {
              var min = _v0.a;
              return A2(
                  $elm$core$Maybe$andThen,
                  function (_v1) {
                      var max = _v1.a;
                      return $elm$core$Maybe$Just(
                          _Utils_Tuple2(min, max));
                  },
                  $elm_community$intdict$IntDict$findMax(
                      $elm_community$graph$Graph$unGraph(graph)));
          },
          $elm_community$intdict$IntDict$findMin(
              $elm_community$graph$Graph$unGraph(graph)));
  };
  var $elm_community$graph$Graph$applyEdgeDiff = F3(
      function (nodeId, diff, graphRep) {
          var updateOutgoingEdge = F2(
              function (upd, node) {
                  return _Utils_update(
                      node,
                      {
                          outgoing: A3($elm_community$intdict$IntDict$update, nodeId, upd, node.outgoing)
                      });
              });
          var updateIncomingEdge = F2(
              function (upd, node) {
                  return _Utils_update(
                      node,
                      {
                          incoming: A3($elm_community$intdict$IntDict$update, nodeId, upd, node.incoming)
                      });
              });
          var flippedFoldl = F3(
              function (f, dict, acc) {
                  return A3($elm_community$intdict$IntDict$foldl, f, acc, dict);
              });
          var edgeUpdateToMaybe = function (edgeUpdate) {
              if (edgeUpdate.$ === 'Insert') {
                  var lbl = edgeUpdate.a;
                  return $elm$core$Maybe$Just(lbl);
              } else {
                  return $elm$core$Maybe$Nothing;
              }
          };
          var updateAdjacency = F3(
              function (updateEdge, updatedId, edgeUpdate) {
                  var updateLbl = updateEdge(
                      $elm$core$Basics$always(
                          edgeUpdateToMaybe(edgeUpdate)));
                  return A2(
                      $elm_community$intdict$IntDict$update,
                      updatedId,
                      $elm$core$Maybe$map(updateLbl));
              });
          return A3(
              flippedFoldl,
              updateAdjacency(updateOutgoingEdge),
              diff.outgoing,
              A3(
                  flippedFoldl,
                  updateAdjacency(updateIncomingEdge),
                  diff.incoming,
                  graphRep));
      });
  var $elm_community$graph$Graph$Insert = function (a) {
      return {$: 'Insert', a: a};
  };
  var $elm_community$graph$Graph$Remove = function (a) {
      return {$: 'Remove', a: a};
  };
  var $elm_community$graph$Graph$emptyDiff = {incoming: $elm_community$intdict$IntDict$empty, outgoing: $elm_community$intdict$IntDict$empty};
  var $elm_community$graph$Graph$computeEdgeDiff = F2(
      function (old, _new) {
          var collectUpdates = F3(
              function (edgeUpdate, updatedId, label) {
                  var replaceUpdate = function (old_) {
                      var _v5 = _Utils_Tuple2(
                          old_,
                          edgeUpdate(label));
                      if (_v5.a.$ === 'Just') {
                          if (_v5.a.a.$ === 'Remove') {
                              if (_v5.b.$ === 'Insert') {
                                  var oldLbl = _v5.a.a.a;
                                  var newLbl = _v5.b.a;
                                  return _Utils_eq(oldLbl, newLbl) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
                                      $elm_community$graph$Graph$Insert(newLbl));
                              } else {
                                  return $elm_community$graph$Graph$crashHack('Graph.computeEdgeDiff: Collected two removals for the same edge. This is an error in the implementation of Graph and you should file a bug report!');
                              }
                          } else {
                              return $elm_community$graph$Graph$crashHack('Graph.computeEdgeDiff: Collected inserts before removals. This is an error in the implementation of Graph and you should file a bug report!');
                          }
                      } else {
                          var _v6 = _v5.a;
                          var eu = _v5.b;
                          return $elm$core$Maybe$Just(eu);
                      }
                  };
                  return A2($elm_community$intdict$IntDict$update, updatedId, replaceUpdate);
              });
          var collect = F3(
              function (edgeUpdate, adj, updates) {
                  return A3(
                      $elm_community$intdict$IntDict$foldl,
                      collectUpdates(edgeUpdate),
                      updates,
                      adj);
              });
          var _v0 = _Utils_Tuple2(old, _new);
          if (_v0.a.$ === 'Nothing') {
              if (_v0.b.$ === 'Nothing') {
                  var _v1 = _v0.a;
                  var _v2 = _v0.b;
                  return $elm_community$graph$Graph$emptyDiff;
              } else {
                  var _v4 = _v0.a;
                  var ins = _v0.b.a;
                  return {
                      incoming: A3(collect, $elm_community$graph$Graph$Insert, ins.outgoing, $elm_community$intdict$IntDict$empty),
                      outgoing: A3(collect, $elm_community$graph$Graph$Insert, ins.incoming, $elm_community$intdict$IntDict$empty)
                  };
              }
          } else {
              if (_v0.b.$ === 'Nothing') {
                  var rem = _v0.a.a;
                  var _v3 = _v0.b;
                  return {
                      incoming: A3(collect, $elm_community$graph$Graph$Remove, rem.outgoing, $elm_community$intdict$IntDict$empty),
                      outgoing: A3(collect, $elm_community$graph$Graph$Remove, rem.incoming, $elm_community$intdict$IntDict$empty)
                  };
              } else {
                  var rem = _v0.a.a;
                  var ins = _v0.b.a;
                  return _Utils_eq(rem, ins) ? $elm_community$graph$Graph$emptyDiff : {
                      incoming: A3(
                          collect,
                          $elm_community$graph$Graph$Insert,
                          ins.outgoing,
                          A3(collect, $elm_community$graph$Graph$Remove, rem.outgoing, $elm_community$intdict$IntDict$empty)),
                      outgoing: A3(
                          collect,
                          $elm_community$graph$Graph$Insert,
                          ins.incoming,
                          A3(collect, $elm_community$graph$Graph$Remove, rem.incoming, $elm_community$intdict$IntDict$empty))
                  };
              }
          }
      });
  var $elm_community$intdict$IntDict$filter = F2(
      function (predicate, dict) {
          var add = F3(
              function (k, v, d) {
                  return A2(predicate, k, v) ? A3($elm_community$intdict$IntDict$insert, k, v, d) : d;
              });
          return A3($elm_community$intdict$IntDict$foldl, add, $elm_community$intdict$IntDict$empty, dict);
      });
  var $elm_community$graph$Graph$update = F2(
      function (nodeId, updater) {
          var wrappedUpdater = function (rep) {
              var old = A2($elm_community$intdict$IntDict$get, nodeId, rep);
              var filterInvalidEdges = function (ctx) {
                  return $elm_community$intdict$IntDict$filter(
                      F2(
                          function (id, _v0) {
                              return _Utils_eq(id, ctx.node.id) || A2($elm_community$intdict$IntDict$member, id, rep);
                          }));
              };
              var cleanUpEdges = function (ctx) {
                  return _Utils_update(
                      ctx,
                      {
                          incoming: A2(filterInvalidEdges, ctx, ctx.incoming),
                          outgoing: A2(filterInvalidEdges, ctx, ctx.outgoing)
                      });
              };
              var _new = A2(
                  $elm$core$Maybe$map,
                  cleanUpEdges,
                  updater(old));
              var diff = A2($elm_community$graph$Graph$computeEdgeDiff, old, _new);
              return A3(
                  $elm_community$intdict$IntDict$update,
                  nodeId,
                  $elm$core$Basics$always(_new),
                  A3($elm_community$graph$Graph$applyEdgeDiff, nodeId, diff, rep));
          };
          return A2(
              $elm$core$Basics$composeR,
              $elm_community$graph$Graph$unGraph,
              A2($elm$core$Basics$composeR, wrappedUpdater, $elm_community$graph$Graph$Graph));
      });
  var $elm_community$graph$Graph$remove = F2(
      function (nodeId, graph) {
          return A3(
              $elm_community$graph$Graph$update,
              nodeId,
              $elm$core$Basics$always($elm$core$Maybe$Nothing),
              graph);
      });
  var $elm_community$graph$Graph$fold = F3(
      function (f, acc, graph) {
          var go = F2(
              function (acc1, graph1) {
                  go:
                  while (true) {
                      var maybeContext = A2(
                          $elm$core$Maybe$andThen,
                          function (id) {
                              return A2($elm_community$graph$Graph$get, id, graph);
                          },
                          A2(
                              $elm$core$Maybe$map,
                              $elm$core$Tuple$first,
                              $elm_community$graph$Graph$nodeIdRange(graph1)));
                      if (maybeContext.$ === 'Just') {
                          var ctx = maybeContext.a;
                          var $temp$acc1 = A2(f, ctx, acc1),
                              $temp$graph1 = A2($elm_community$graph$Graph$remove, ctx.node.id, graph1);
                          acc1 = $temp$acc1;
                          graph1 = $temp$graph1;
                          continue go;
                      } else {
                          return acc1;
                      }
                  }
              });
          return A2(go, acc, graph);
      });
  var $elm_community$intdict$IntDict$isEmpty = function (dict) {
      if (dict.$ === 'Empty') {
          return true;
      } else {
          return false;
      }
  };
  var $elm_community$graph$Graph$heightLevels = function (_v0) {
      var startingGraph = _v0.a;
      var subtract = F2(
          function (a, b) {
              return b - a;
          });
      var isSource = function (ctx) {
          return $elm_community$intdict$IntDict$isEmpty(ctx.incoming);
      };
      var sources = A3(
          $elm_community$graph$Graph$fold,
          F2(
              function (ctx, acc) {
                  return isSource(ctx) ? A2($elm$core$List$cons, ctx, acc) : acc;
              }),
          _List_Nil,
          startingGraph);
      var decrementAndNoteSources = F3(
          function (id, _v7, _v8) {
              var nextLevel = _v8.a;
              var indegrees = _v8.b;
              var indegreesDec = A3(
                  $elm_community$intdict$IntDict$update,
                  id,
                  $elm$core$Maybe$map(
                      subtract(1)),
                  indegrees);
              var _v5 = A2($elm_community$intdict$IntDict$get, id, indegreesDec);
              if ((_v5.$ === 'Just') && (!_v5.a)) {
                  var _v6 = A2($elm_community$graph$Graph$get, id, startingGraph);
                  if (_v6.$ === 'Just') {
                      var ctx = _v6.a;
                      return _Utils_Tuple2(
                          A2($elm$core$List$cons, ctx, nextLevel),
                          indegreesDec);
                  } else {
                      return $elm_community$graph$Graph$crashHack('Graph.heightLevels: Could not get a node of a graph which should be there by invariants. Please file a bug report!');
                  }
              } else {
                  return _Utils_Tuple2(nextLevel, indegreesDec);
              }
          });
      var decrementIndegrees = F3(
          function (source, nextLevel, indegrees) {
              return A3(
                  $elm_community$intdict$IntDict$foldl,
                  decrementAndNoteSources,
                  _Utils_Tuple2(nextLevel, indegrees),
                  source.outgoing);
          });
      var go = F4(
          function (currentLevel, nextLevel, indegrees, graph) {
              var _v1 = _Utils_Tuple2(currentLevel, nextLevel);
              if (!_v1.a.b) {
                  if (!_v1.b.b) {
                      return _List_fromArray(
                          [_List_Nil]);
                  } else {
                      return A2(
                          $elm$core$List$cons,
                          _List_Nil,
                          A4(go, nextLevel, _List_Nil, indegrees, graph));
                  }
              } else {
                  var _v2 = _v1.a;
                  var source = _v2.a;
                  var currentLevel1 = _v2.b;
                  var _v3 = A3(decrementIndegrees, source, nextLevel, indegrees);
                  var nextLevel1 = _v3.a;
                  var indegrees1 = _v3.b;
                  var _v4 = A4(
                      go,
                      currentLevel1,
                      nextLevel1,
                      indegrees1,
                      A2($elm_community$graph$Graph$remove, source.node.id, graph));
                  if (!_v4.b) {
                      return $elm_community$graph$Graph$crashHack('Graph.heightLevels: Reached a branch which is impossible by invariants. Please file a bug report!');
                  } else {
                      var level = _v4.a;
                      var levels = _v4.b;
                      return A2(
                          $elm$core$List$cons,
                          A2($elm$core$List$cons, source, level),
                          levels);
                  }
              }
          });
      var countIndegrees = A2(
          $elm_community$graph$Graph$fold,
          function (ctx) {
              return A2(
                  $elm_community$intdict$IntDict$insert,
                  ctx.node.id,
                  $elm_community$intdict$IntDict$size(ctx.incoming));
          },
          $elm_community$intdict$IntDict$empty);
      return A4(
          go,
          sources,
          _List_Nil,
          countIndegrees(startingGraph),
          startingGraph);
  };
  var $goyalarchit$elm_dagre$Dagre$Rank$assignRanks = function (g) {
      return A2(
          $elm$core$List$map,
          function (r) {
              return A2(
                  $elm$core$List$map,
                  function (node) {
                      return node.node.id;
                  },
                  r);
          },
          $elm_community$graph$Graph$heightLevels(g));
  };
  var $goyalarchit$elm_dagre$Dagre$Utils$getEdges = function (g) {
      var edges = $elm_community$graph$Graph$edges(g);
      return A2(
          $elm$core$List$map,
          function (e) {
              return _Utils_Tuple2(e.from, e.to);
          },
          edges);
  };
  var $goyalarchit$elm_dagre$Dagre$Attributes$RL = {$: 'RL'};
  var $goyalarchit$elm_dagre$Dagre$Attributes$BT = {$: 'BT'};
  var $elm$core$Dict$map = F2(
      function (func, dict) {
          if (dict.$ === 'RBEmpty_elm_builtin') {
              return $elm$core$Dict$RBEmpty_elm_builtin;
          } else {
              var color = dict.a;
              var key = dict.b;
              var value = dict.c;
              var left = dict.d;
              var right = dict.e;
              return A5(
                  $elm$core$Dict$RBNode_elm_builtin,
                  color,
                  key,
                  A2(func, key, value),
                  A2($elm$core$Dict$map, func, left),
                  A2($elm$core$Dict$map, func, right));
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Position$applyRankDir = F2(
      function (rankDir, init_coords) {
          var coords_ = (_Utils_eq(rankDir, $goyalarchit$elm_dagre$Dagre$Attributes$BT) || _Utils_eq(rankDir, $goyalarchit$elm_dagre$Dagre$Attributes$RL)) ? A2(
              $elm$core$Dict$map,
              F2(
                  function (_v2, _v3) {
                      var x = _v3.a;
                      var y = _v3.b;
                      return _Utils_Tuple2(x, -y);
                  }),
              init_coords) : init_coords;
          return (_Utils_eq(rankDir, $goyalarchit$elm_dagre$Dagre$Attributes$LR) || _Utils_eq(rankDir, $goyalarchit$elm_dagre$Dagre$Attributes$RL)) ? A2(
              $elm$core$Dict$map,
              F2(
                  function (_v0, _v1) {
                      var x = _v1.a;
                      var y = _v1.b;
                      return _Utils_Tuple2(y, x);
                  }),
              coords_) : coords_;
      });
  var $elm$core$Dict$foldl = F3(
      function (func, acc, dict) {
          foldl:
          while (true) {
              if (dict.$ === 'RBEmpty_elm_builtin') {
                  return acc;
              } else {
                  var key = dict.b;
                  var value = dict.c;
                  var left = dict.d;
                  var right = dict.e;
                  var $temp$func = func,
                      $temp$acc = A3(
                      func,
                      key,
                      value,
                      A3($elm$core$Dict$foldl, func, acc, left)),
                      $temp$dict = right;
                  func = $temp$func;
                  acc = $temp$acc;
                  dict = $temp$dict;
                  continue foldl;
              }
          }
      });
  var $elm$core$Dict$merge = F6(
      function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
          var stepState = F3(
              function (rKey, rValue, _v0) {
                  stepState:
                  while (true) {
                      var list = _v0.a;
                      var result = _v0.b;
                      if (!list.b) {
                          return _Utils_Tuple2(
                              list,
                              A3(rightStep, rKey, rValue, result));
                      } else {
                          var _v2 = list.a;
                          var lKey = _v2.a;
                          var lValue = _v2.b;
                          var rest = list.b;
                          if (_Utils_cmp(lKey, rKey) < 0) {
                              var $temp$rKey = rKey,
                                  $temp$rValue = rValue,
                                  $temp$_v0 = _Utils_Tuple2(
                                  rest,
                                  A3(leftStep, lKey, lValue, result));
                              rKey = $temp$rKey;
                              rValue = $temp$rValue;
                              _v0 = $temp$_v0;
                              continue stepState;
                          } else {
                              if (_Utils_cmp(lKey, rKey) > 0) {
                                  return _Utils_Tuple2(
                                      list,
                                      A3(rightStep, rKey, rValue, result));
                              } else {
                                  return _Utils_Tuple2(
                                      rest,
                                      A4(bothStep, lKey, lValue, rValue, result));
                              }
                          }
                      }
                  }
              });
          var _v3 = A3(
              $elm$core$Dict$foldl,
              stepState,
              _Utils_Tuple2(
                  $elm$core$Dict$toList(leftDict),
                  initialResult),
              rightDict);
          var leftovers = _v3.a;
          var intermediateResult = _v3.b;
          return A3(
              $elm$core$List$foldl,
              F2(
                  function (_v4, result) {
                      var k = _v4.a;
                      var v = _v4.b;
                      return A3(leftStep, k, v, result);
                  }),
              intermediateResult,
              leftovers);
      });
  var $goyalarchit$elm_dagre$Dagre$Position$combinePoints = F2(
      function (xs, ys) {
          var onlyY = F3(
              function (n, y, finalDict) {
                  return A3(
                      $elm$core$Dict$insert,
                      n,
                      _Utils_Tuple2(0, y),
                      finalDict);
              });
          var onlyX = F3(
              function (n, x, finalDict) {
                  return A3(
                      $elm$core$Dict$insert,
                      n,
                      _Utils_Tuple2(x, 0),
                      finalDict);
              });
          var bothXY = F4(
              function (n, x, y, finalDict) {
                  return A3(
                      $elm$core$Dict$insert,
                      n,
                      _Utils_Tuple2(x, y),
                      finalDict);
              });
          return A6($elm$core$Dict$merge, onlyX, bothXY, onlyY, xs, ys, $elm$core$Dict$empty);
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$Down = {$: 'Down'};
  var $goyalarchit$elm_dagre$Dagre$Position$BK$Left = {$: 'Left'};
  var $goyalarchit$elm_dagre$Dagre$Position$BK$Right = {$: 'Right'};
  var $goyalarchit$elm_dagre$Dagre$Position$BK$Up = {$: 'Up'};
  var $elm$core$List$minimum = function (list) {
      if (list.b) {
          var x = list.a;
          var xs = list.b;
          return $elm$core$Maybe$Just(
              A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
      } else {
          return $elm$core$Maybe$Nothing;
      }
  };
  var $elm$core$Dict$values = function (dict) {
      return A3(
          $elm$core$Dict$foldr,
          F3(
              function (key, value, valueList) {
                  return A2($elm$core$List$cons, value, valueList);
              }),
          _List_Nil,
          dict);
  };
  var $goyalarchit$elm_dagre$Dagre$Position$BK$alignCoordinates = F2(
      function (xss, alignTo) {
          var minX = function (xs) {
              return A2(
                  $elm$core$Maybe$withDefault,
                  0,
                  $elm$core$List$minimum(
                      $elm$core$Dict$values(xs)));
          };
          var maxX = function (xs) {
              return A2(
                  $elm$core$Maybe$withDefault,
                  0,
                  $elm$core$List$maximum(
                      $elm$core$Dict$values(xs)));
          };
          var alignToMin = minX(alignTo);
          var alignToMax = maxX(alignTo);
          var delta = F2(
              function (hDir, xs) {
                  if (hDir.$ === 'Left') {
                      return alignToMin - minX(xs);
                  } else {
                      return alignToMax - maxX(xs);
                  }
              });
          var deltas = A2(
              $elm$core$List$map,
              function (_v3) {
                  var _v4 = _v3.a;
                  var hDir = _v4.b;
                  var xs = _v3.b;
                  return A2(delta, hDir, xs);
              },
              xss);
          var xss_ = A3(
              $elm$core$List$map2,
              F2(
                  function (_v0, del) {
                      var _v1 = _v0.a;
                      var xs = _v0.b;
                      return A2(
                          $elm$core$Dict$map,
                          F2(
                              function (_v2, x) {
                                  return x + del;
                              }),
                          xs);
                  }),
              xss,
              deltas);
          return xss_;
      });
  var $elm$core$Dict$member = F2(
      function (key, dict) {
          var _v0 = A2($elm$core$Dict$get, key, dict);
          if (_v0.$ === 'Just') {
              return true;
          } else {
              return false;
          }
      });
  var $elm$core$List$sortBy = _List_sortBy;
  var $elm$core$List$sort = function (xs) {
      return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
  };
  var $goyalarchit$elm_dagre$Dagre$Position$BK$balance = function (xss) {
      var helper = F3(
          function (n, x, xsC) {
              return A2($elm$core$Dict$member, n, xsC) ? A3(
                  $elm$core$Dict$update,
                  n,
                  $elm$core$Maybe$map(
                      function (xCoords) {
                          return A2($elm$core$List$cons, x, xCoords);
                      }),
                  xsC) : A3(
                  $elm$core$Dict$insert,
                  n,
                  _List_fromArray(
                      [x]),
                  xsC);
          });
      var finalX = function (l) {
          if (!l.b) {
              return 0;
          } else {
              if (l.b.b) {
                  if (l.b.b.b) {
                      if (l.b.b.b.b) {
                          if (!l.b.b.b.b.b) {
                              var _v3 = l.b;
                              var x1 = _v3.a;
                              var _v4 = _v3.b;
                              var x2 = _v4.a;
                              var _v5 = _v4.b;
                              return (x1 + x2) / 2;
                          } else {
                              var x = l.a;
                              return x;
                          }
                      } else {
                          var _v6 = l.b;
                          var x = _v6.a;
                          var _v7 = _v6.b;
                          return x;
                      }
                  } else {
                      var x0 = l.a;
                      var _v8 = l.b;
                      var x1 = _v8.a;
                      return (x0 + x1) / 2;
                  }
              } else {
                  var x = l.a;
                  return x;
              }
          }
      };
      var appendXs = F2(
          function (xs, xsC) {
              return A3($elm$core$Dict$foldl, helper, xsC, xs);
          });
      var multiXs = A3($elm$core$List$foldl, appendXs, $elm$core$Dict$empty, xss);
      var sortedMultiXs = A2(
          $elm$core$Dict$map,
          F2(
              function (_v1, x) {
                  return $elm$core$List$sort(x);
              }),
          multiXs);
      return A2(
          $elm$core$Dict$map,
          F2(
              function (_v0, xList) {
                  return finalX(xList);
              }),
          sortedMultiXs);
  };
  var $elm$core$List$head = function (list) {
      if (list.b) {
          var x = list.a;
          var xs = list.b;
          return $elm$core$Maybe$Just(x);
      } else {
          return $elm$core$Maybe$Nothing;
      }
  };
  var $elm_community$list_extra$List$Extra$getAt = F2(
      function (idx, xs) {
          return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
              A2($elm$core$List$drop, idx, xs));
      });
  var $elm_community$list_extra$List$Extra$minimumBy = F2(
      function (f, ls) {
          var minBy = F2(
              function (x, _v1) {
                  var y = _v1.a;
                  var fy = _v1.b;
                  var fx = f(x);
                  return (_Utils_cmp(fx, fy) < 0) ? _Utils_Tuple2(x, fx) : _Utils_Tuple2(y, fy);
              });
          if (ls.b) {
              if (!ls.b.b) {
                  var l_ = ls.a;
                  return $elm$core$Maybe$Just(l_);
              } else {
                  var l_ = ls.a;
                  var ls_ = ls.b;
                  return $elm$core$Maybe$Just(
                      A3(
                          $elm$core$List$foldl,
                          minBy,
                          _Utils_Tuple2(
                              l_,
                              f(l_)),
                          ls_).a);
              }
          } else {
              return $elm$core$Maybe$Nothing;
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$width = function (config) {
      return function (nodeId) {
          return A2(
              $elm$core$Maybe$withDefault,
              config.width,
              A2($elm$core$Dict$get, nodeId, config.widthDict));
      };
  };
  var $goyalarchit$elm_dagre$Dagre$Position$BK$findSmallestWidthAlignment = F2(
      function (config, xss) {
          var getWidth = function (n) {
              return A2($goyalarchit$elm_dagre$Dagre$Position$BK$width, config, n);
          };
          var maxX = function (xs) {
              return A2(
                  $elm$core$Maybe$withDefault,
                  0,
                  $elm$core$List$maximum(
                      $elm$core$Dict$values(
                          A2(
                              $elm$core$Dict$map,
                              F2(
                                  function (k, v) {
                                      return v + (getWidth(k) / 2);
                                  }),
                              xs))));
          };
          var minX = function (xs) {
              return A2(
                  $elm$core$Maybe$withDefault,
                  0,
                  $elm$core$List$minimum(
                      $elm$core$Dict$values(
                          A2(
                              $elm$core$Dict$map,
                              F2(
                                  function (k, v) {
                                      return v - (getWidth(k) / 2);
                                  }),
                              xs))));
          };
          var widthXss = A2(
              $elm$core$List$map,
              function (xs) {
                  return _Utils_Tuple2(
                      maxX(xs) - minX(xs),
                      xs);
              },
              xss);
          var defXs = A2(
              $elm$core$Maybe$withDefault,
              _Utils_Tuple2(0, $elm$core$Dict$empty),
              A2($elm_community$list_extra$List$Extra$getAt, 0, widthXss));
          return A2(
              $elm$core$Maybe$withDefault,
              defXs,
              A2($elm_community$list_extra$List$Extra$minimumBy, $elm$core$Tuple$first, widthXss)).b;
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$Inner = {$: 'Inner'};
  var $goyalarchit$elm_dagre$Dagre$Utils$NonInner = {$: 'NonInner'};
  var $goyalarchit$elm_dagre$Dagre$Utils$markEdgeWithEdgeType = F2(
      function (initDummyId, e) {
          var _v0 = e;
          var from = _v0.a;
          var to = _v0.b;
          return ((_Utils_cmp(from, initDummyId) > -1) && (_Utils_cmp(to, initDummyId) > -1)) ? _Utils_Tuple2(e, $goyalarchit$elm_dagre$Dagre$Utils$Inner) : _Utils_Tuple2(e, $goyalarchit$elm_dagre$Dagre$Utils$NonInner);
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$markEdgesWithEdgeType = F2(
      function (g, edges) {
          var initDummyId = function () {
              var _v0 = $elm$core$List$maximum(
                  A2(
                      $elm$core$List$map,
                      function (n) {
                          return n.id;
                      },
                      $elm_community$graph$Graph$nodes(g)));
              if (_v0.$ === 'Just') {
                  var x = _v0.a;
                  return x + 1;
              } else {
                  return -1;
              }
          }();
          return A2(
              $elm$core$List$map,
              $goyalarchit$elm_dagre$Dagre$Utils$markEdgeWithEdgeType(initDummyId),
              edges);
      });
  var $elm$core$List$filter = F2(
      function (isGood, list) {
          return A3(
              $elm$core$List$foldr,
              F2(
                  function (x, xs) {
                      return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
                  }),
              _List_Nil,
              list);
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$alongIncomingEdges = F2(
      function (edges, nodeId) {
          return A2(
              $elm$core$List$map,
              function (e) {
                  return e.a;
              },
              A2(
                  $elm$core$List$filter,
                  function (e) {
                      return _Utils_eq(e.b, nodeId);
                  },
                  edges));
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$alongOutgoingEdges = F2(
      function (edges, nodeId) {
          return A2(
              $elm$core$List$map,
              function (e) {
                  return e.b;
              },
              A2(
                  $elm$core$List$filter,
                  function (e) {
                      return _Utils_eq(e.a, nodeId);
                  },
                  edges));
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$intMin = A2($elm$core$Basics$pow, -2, 31);
  var $goyalarchit$elm_dagre$Dagre$Position$BK$getNode = F2(
      function (node, dict) {
          var _v0 = A2($elm$core$Dict$get, node, dict);
          if (_v0.$ === 'Just') {
              var x = _v0.a;
              return x;
          } else {
              return $goyalarchit$elm_dagre$Dagre$Utils$intMin;
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$infinity = A2($elm$core$Basics$pow, 2, 31) - 1;
  var $goyalarchit$elm_dagre$Dagre$Position$BK$assignAbsoluteX = F5(
      function (root, shift, sink, v, xs) {
          var root_v = A2($goyalarchit$elm_dagre$Dagre$Position$BK$getNode, v, root);
          var shift_sink_root_v = function () {
              var _v1 = A2($elm$core$Dict$get, root_v, sink);
              if (_v1.$ === 'Nothing') {
                  return $goyalarchit$elm_dagre$Dagre$Utils$infinity;
              } else {
                  var sink_root_v = _v1.a;
                  var _v2 = A2($elm$core$Dict$get, sink_root_v, shift);
                  if (_v2.$ === 'Nothing') {
                      return $goyalarchit$elm_dagre$Dagre$Utils$infinity;
                  } else {
                      var shiftVal = _v2.a;
                      return shiftVal;
                  }
              }
          }();
          var xs_v = function () {
              var _v0 = A2($elm$core$Dict$get, root_v, xs);
              if (_v0.$ === 'Nothing') {
                  return A3($elm$core$Dict$insert, v, 0, xs);
              } else {
                  var xsRootV = _v0.a;
                  return A3($elm$core$Dict$insert, v, xsRootV, xs);
              }
          }();
          var xs_v_shifted = (_Utils_eq(v, root_v) && (_Utils_cmp(shift_sink_root_v, $goyalarchit$elm_dagre$Dagre$Utils$infinity) < 0)) ? A3(
              $elm$core$Dict$update,
              v,
              $elm$core$Maybe$map(
                  function (n) {
                      return n + shift_sink_root_v;
                  }),
              xs_v) : xs_v;
          return xs_v_shifted;
      });
  var $elm$core$Tuple$pair = F2(
      function (a, b) {
          return _Utils_Tuple2(a, b);
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$getPredDictHelper = F2(
      function (layer, pred) {
          var predecessors = A2(
              $elm$core$List$take,
              $elm$core$List$length(layer) - 1,
              layer);
          var nodes = A2($elm$core$List$drop, 1, layer);
          var nodesWithPreds = A3($elm$core$List$map2, $elm$core$Tuple$pair, nodes, predecessors);
          var finalDict = A3(
              $elm$core$List$foldl,
              F2(
                  function (_v0, predDict) {
                      var n = _v0.a;
                      var p = _v0.b;
                      return A3($elm$core$Dict$insert, n, p, predDict);
                  }),
              pred,
              nodesWithPreds);
          return finalDict;
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$getPredDict = function (rankList) {
      var initDict = $elm$core$Dict$empty;
      var pred = A3($elm$core$List$foldl, $goyalarchit$elm_dagre$Dagre$Position$BK$getPredDictHelper, initDict, rankList);
      return pred;
  };
  var $goyalarchit$elm_dagre$Dagre$Position$BK$updateShiftOrXS = F5(
      function (delta, sink, u, v, _v0) {
          var shift = _v0.a;
          var xs = _v0.b;
          if (!_Utils_eq(
              A2($elm$core$Dict$get, v, sink),
              A2($elm$core$Dict$get, u, sink))) {
              var xs_v_ = A2($elm$core$Dict$get, v, xs);
              var xs_u_ = A2($elm$core$Dict$get, u, xs);
              var sink_u_ = A2($elm$core$Dict$get, u, sink);
              var shift_sink_u_ = A2(
                  $elm$core$Maybe$andThen,
                  function (sink_u) {
                      return A2($elm$core$Dict$get, sink_u, shift);
                  },
                  sink_u_);
              var updateValue = function () {
                  var _v3 = _Utils_Tuple3(shift_sink_u_, xs_v_, xs_u_);
                  if (((_v3.a.$ === 'Just') && (_v3.b.$ === 'Just')) && (_v3.c.$ === 'Just')) {
                      var ss_u = _v3.a.a;
                      var xs_v = _v3.b.a;
                      var xs_u = _v3.c.a;
                      return $elm$core$Maybe$Just(
                          A2($elm$core$Basics$min, ss_u, (xs_v - xs_u) - delta));
                  } else {
                      return $elm$core$Maybe$Nothing;
                  }
              }();
              var updatedShift = function () {
                  if (sink_u_.$ === 'Just') {
                      var sink_u = sink_u_.a;
                      return A3(
                          $elm$core$Dict$update,
                          sink_u,
                          function (_v2) {
                              return updateValue;
                          },
                          shift);
                  } else {
                      return shift;
                  }
              }();
              return _Utils_Tuple2(updatedShift, xs);
          } else {
              var xs_v_ = A2($elm$core$Dict$get, v, xs);
              var xs_u_ = A2($elm$core$Dict$get, u, xs);
              var updateValue = function () {
                  var _v5 = _Utils_Tuple2(xs_v_, xs_u_);
                  if ((_v5.a.$ === 'Just') && (_v5.b.$ === 'Just')) {
                      var xs_v = _v5.a.a;
                      var xs_u = _v5.b.a;
                      return $elm$core$Maybe$Just(
                          A2($elm$core$Basics$max, xs_v, xs_u + delta));
                  } else {
                      return $elm$core$Maybe$Nothing;
                  }
              }();
              var updatedXS = A3(
                  $elm$core$Dict$update,
                  v,
                  function (_v4) {
                      return updateValue;
                  },
                  xs);
              return _Utils_Tuple2(shift, updatedXS);
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$placeBlock = F6(
      function (pred, sepFn, root, align, v, _v10) {
          var shift = _v10.a;
          var sink = _v10.b;
          var xs = _v10.c;
          var _v11 = A2($elm$core$Dict$get, v, xs);
          if (_v11.$ === 'Nothing') {
              var xsV = A3($elm$core$Dict$insert, v, 0, xs);
              return A7(
                  $goyalarchit$elm_dagre$Dagre$Position$BK$placeBlockHelper,
                  pred,
                  sepFn,
                  root,
                  align,
                  v,
                  v,
                  _Utils_Tuple3(shift, sink, xsV));
          } else {
              return _Utils_Tuple3(shift, sink, xs);
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$placeBlockHelper = F7(
      function (pred, sepFn, root, align, v, w, _v6) {
          placeBlockHelper:
          while (true) {
              var shift = _v6.a;
              var sink = _v6.b;
              var xs = _v6.c;
              var w_new_ = A2($elm$core$Dict$get, w, align);
              var _v7 = function () {
                  var _v8 = A2($elm$core$Dict$get, w, pred);
                  if (_v8.$ === 'Nothing') {
                      return _Utils_Tuple3(shift, sink, xs);
                  } else {
                      var p = _v8.a;
                      return A8(
                          $goyalarchit$elm_dagre$Dagre$Position$BK$placePredecessor,
                          p,
                          pred,
                          sepFn,
                          root,
                          align,
                          v,
                          w,
                          _Utils_Tuple3(shift, sink, xs));
                  }
              }();
              var final_shift = _v7.a;
              var final_sink = _v7.b;
              var final_xs = _v7.c;
              if (_Utils_eq(
                  w_new_,
                  $elm$core$Maybe$Just(v))) {
                  return _Utils_Tuple3(final_shift, final_sink, final_xs);
              } else {
                  if (w_new_.$ === 'Nothing') {
                      return _Utils_Tuple3(final_shift, final_sink, final_xs);
                  } else {
                      var w_new = w_new_.a;
                      var $temp$pred = pred,
                          $temp$sepFn = sepFn,
                          $temp$root = root,
                          $temp$align = align,
                          $temp$v = v,
                          $temp$w = w_new,
                          $temp$_v6 = _Utils_Tuple3(final_shift, final_sink, final_xs);
                      pred = $temp$pred;
                      sepFn = $temp$sepFn;
                      root = $temp$root;
                      align = $temp$align;
                      v = $temp$v;
                      w = $temp$w;
                      _v6 = $temp$_v6;
                      continue placeBlockHelper;
                  }
              }
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$placePredecessor = F8(
      function (p, pred, sepFn, root, align, v, w, _v0) {
          var shift = _v0.a;
          var sink = _v0.b;
          var xs = _v0.c;
          var root_p_ = A2($elm$core$Dict$get, p, root);
          var delta = A2(sepFn, w, p);
          var _v1 = function () {
              if (root_p_.$ === 'Nothing') {
                  return _Utils_Tuple3(shift, sink, xs);
              } else {
                  var u = root_p_.a;
                  return A6(
                      $goyalarchit$elm_dagre$Dagre$Position$BK$placeBlock,
                      pred,
                      sepFn,
                      root,
                      align,
                      u,
                      _Utils_Tuple3(shift, sink, xs));
              }
          }();
          var pred_shift = _v1.a;
          var pred_sink = _v1.b;
          var pred_xs = _v1.c;
          var updatedSink = _Utils_eq(
              A2($elm$core$Dict$get, v, pred_sink),
              $elm$core$Maybe$Just(v)) ? A3(
              $elm$core$Dict$update,
              v,
              function (_v5) {
                  return A2(
                      $elm$core$Dict$get,
                      A2($goyalarchit$elm_dagre$Dagre$Position$BK$getNode, p, root),
                      pred_sink);
              },
              pred_sink) : pred_sink;
          var _v3 = function () {
              if (root_p_.$ === 'Nothing') {
                  return _Utils_Tuple2(pred_shift, pred_xs);
              } else {
                  var u = root_p_.a;
                  return A5(
                      $goyalarchit$elm_dagre$Dagre$Position$BK$updateShiftOrXS,
                      delta,
                      updatedSink,
                      u,
                      v,
                      _Utils_Tuple2(pred_shift, pred_xs));
              }
          }();
          var updatedShift = _v3.a;
          var updatedXS = _v3.b;
          return _Utils_Tuple3(updatedShift, updatedSink, updatedXS);
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$isDummyNode = F2(
      function (initDummyId, nodeId) {
          return (_Utils_cmp(nodeId, initDummyId) < 0) ? false : true;
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$sep = F2(
      function (config, g) {
          var initDummyId = function () {
              var _v0 = $elm_community$graph$Graph$nodeIdRange(g);
              if (_v0.$ === 'Nothing') {
                  return 0;
              } else {
                  var _v1 = _v0.a;
                  var maxNodeId = _v1.b;
                  return maxNodeId + 1;
              }
          }();
          var getWidth = function (n) {
              return A2($goyalarchit$elm_dagre$Dagre$Position$BK$width, config, n);
          };
          var getSep = function (nId) {
              return A2($goyalarchit$elm_dagre$Dagre$Utils$isDummyNode, initDummyId, nId) ? config.edgeSep : config.nodeSep;
          };
          return F2(
              function (u, v) {
                  return (((getWidth(u) + getSep(u)) + getSep(v)) + getWidth(v)) / 2;
              });
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$horizontalCompaction = F4(
      function (_v0, rankList, root, align) {
          var config = _v0.a;
          var g = _v0.b;
          var xs = $elm$core$Dict$empty;
          var sink = $elm$core$Dict$fromList(
              A2(
                  $elm$core$List$map,
                  function (n) {
                      return _Utils_Tuple2(n, n);
                  },
                  $elm$core$List$concat(rankList)));
          var shift = $elm$core$Dict$fromList(
              A2(
                  $elm$core$List$map,
                  function (n) {
                      return _Utils_Tuple2(n, $goyalarchit$elm_dagre$Dagre$Utils$infinity);
                  },
                  $elm$core$List$concat(rankList)));
          var sepFn = A2($goyalarchit$elm_dagre$Dagre$Position$BK$sep, config, g);
          var roots = A2(
              $elm$core$List$filter,
              function (v) {
                  return _Utils_eq(
                      $elm$core$Maybe$Just(v),
                      A2($elm$core$Dict$get, v, root));
              },
              $elm$core$List$concat(rankList));
          var pred = $goyalarchit$elm_dagre$Dagre$Position$BK$getPredDict(rankList);
          var _v1 = A3(
              $elm$core$List$foldl,
              A4($goyalarchit$elm_dagre$Dagre$Position$BK$placeBlock, pred, sepFn, root, align),
              _Utils_Tuple3(shift, sink, xs),
              roots);
          var updShift = _v1.a;
          var updSink = _v1.b;
          var updXs = _v1.c;
          var finXs = A3(
              $elm$core$List$foldl,
              F2(
                  function (l, xs_) {
                      return A3(
                          $elm$core$List$foldl,
                          A3($goyalarchit$elm_dagre$Dagre$Position$BK$assignAbsoluteX, root, updShift, updSink),
                          xs_,
                          l);
                  }),
              updXs,
              rankList);
          return finXs;
      });
  var $elm_community$list_extra$List$Extra$elemIndex = function (x) {
      return $elm_community$list_extra$List$Extra$findIndex(
          $elm$core$Basics$eq(x));
  };
  var $goyalarchit$elm_dagre$Dagre$Utils$getOrder = F2(
      function (l, nodeId) {
          var _v0 = A2($elm_community$list_extra$List$Extra$elemIndex, nodeId, l);
          if (_v0.$ === 'Just') {
              var idx = _v0.a;
              return idx;
          } else {
              return -1;
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$getPosDict = function (rankList) {
      var dictList = $elm$core$List$concat(
          A2(
              $elm$core$List$map,
              function (l) {
                  return A2(
                      $elm$core$List$map,
                      function (n) {
                          return _Utils_Tuple2(
                              n,
                              A2($goyalarchit$elm_dagre$Dagre$Utils$getOrder, l, n));
                      },
                      l);
              },
              rankList));
      return $elm$core$Dict$fromList(dictList);
  };
  var $goyalarchit$elm_dagre$Dagre$Position$BK$hasConflict = F2(
      function (conflicts, _v0) {
          var u = _v0.a;
          var v = _v0.b;
          return (A2(
              $elm$core$List$member,
              _Utils_Tuple2(u, v),
              conflicts) || A2(
              $elm$core$List$member,
              _Utils_Tuple2(v, u),
              conflicts)) ? true : false;
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$alignVertexHelper = F4(
      function (conflicts, v, _v0, _v1) {
          var w = _v0.a;
          var pos_w = _v0.b;
          var _v2 = _v1.a;
          var root = _v2.a;
          var align = _v2.b;
          var prevIdx = _v1.b;
          if (_Utils_eq(
              A2($goyalarchit$elm_dagre$Dagre$Position$BK$getNode, v, align),
              v) && ((_Utils_cmp(prevIdx, pos_w) < 0) && (!A2(
              $goyalarchit$elm_dagre$Dagre$Position$BK$hasConflict,
              conflicts,
              _Utils_Tuple2(w, v))))) {
              var updatedRootV = A3(
                  $elm$core$Dict$update,
                  v,
                  $elm$core$Maybe$map(
                      function (_v5) {
                          return A2($goyalarchit$elm_dagre$Dagre$Position$BK$getNode, w, root);
                      }),
                  root);
              var updatedAlignW = A3(
                  $elm$core$Dict$update,
                  w,
                  $elm$core$Maybe$map(
                      function (_v4) {
                          return v;
                      }),
                  align);
              var updatedAlignV = A3(
                  $elm$core$Dict$update,
                  v,
                  $elm$core$Maybe$map(
                      function (_v3) {
                          return A2($goyalarchit$elm_dagre$Dagre$Position$BK$getNode, v, updatedRootV);
                      }),
                  updatedAlignW);
              var newPrevIdx = pos_w;
              return _Utils_Tuple2(
                  _Utils_Tuple2(updatedRootV, updatedAlignV),
                  newPrevIdx);
          } else {
              return _Utils_Tuple2(
                  _Utils_Tuple2(root, align),
                  prevIdx);
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$getPos = F2(
      function (pos, node) {
          var _v0 = A2($elm$core$Dict$get, node, pos);
          if (_v0.$ === 'Just') {
              var idx = _v0.a;
              return idx;
          } else {
              return -1;
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$alignVertex = F5(
      function (pos, conflicts, neighbourFn, v, _v0) {
          var _v1 = _v0.a;
          var root = _v1.a;
          var align = _v1.b;
          var prevIdx = _v0.b;
          var ws = A2(
              $elm$core$List$sortBy,
              $goyalarchit$elm_dagre$Dagre$Position$BK$getPos(pos),
              neighbourFn(v));
          var mp = ($elm$core$List$length(ws) - 1) / 2;
          var w_mp = A2(
              $elm$core$List$map,
              function (w) {
                  return _Utils_Tuple2(
                      w,
                      A2($goyalarchit$elm_dagre$Dagre$Position$BK$getPos, pos, w));
              },
              A2(
                  $elm$core$List$filter,
                  function (w) {
                      return !_Utils_eq(w, $goyalarchit$elm_dagre$Dagre$Utils$intMin);
                  },
                  A2(
                      $elm$core$List$map,
                      function (i) {
                          var _v2 = A2($elm_community$list_extra$List$Extra$getAt, i, ws);
                          if (_v2.$ === 'Just') {
                              var w = _v2.a;
                              return w;
                          } else {
                              return $goyalarchit$elm_dagre$Dagre$Utils$intMin;
                          }
                      },
                      A2(
                          $elm$core$List$range,
                          $elm$core$Basics$floor(mp),
                          $elm$core$Basics$ceiling(mp)))));
          var updatedValues = A3(
              $elm$core$List$foldl,
              A2($goyalarchit$elm_dagre$Dagre$Position$BK$alignVertexHelper, conflicts, v),
              _Utils_Tuple2(
                  _Utils_Tuple2(root, align),
                  prevIdx),
              w_mp);
          return updatedValues;
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$verticalAlignmentVisitLayer = F5(
      function (pos, conflicts, neighbourFn, layer, _v0) {
          var root = _v0.a;
          var align = _v0.b;
          var _v1 = A3(
              $elm$core$List$foldl,
              A3($goyalarchit$elm_dagre$Dagre$Position$BK$alignVertex, pos, conflicts, neighbourFn),
              _Utils_Tuple2(
                  _Utils_Tuple2(root, align),
                  -1),
              layer);
          var _v2 = _v1.a;
          var finalRoot = _v2.a;
          var finalAlign = _v2.b;
          return _Utils_Tuple2(finalRoot, finalAlign);
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$verticalAlignment = F3(
      function (rankList, conflicts, neighbourFn) {
          var root = $elm$core$Dict$fromList(
              A2(
                  $elm$core$List$map,
                  function (n) {
                      return _Utils_Tuple2(n, n);
                  },
                  $elm$core$List$concat(rankList)));
          var pos = $goyalarchit$elm_dagre$Dagre$Position$BK$getPosDict(rankList);
          var align = $elm$core$Dict$fromList(
              A2(
                  $elm$core$List$map,
                  function (n) {
                      return _Utils_Tuple2(n, n);
                  },
                  $elm$core$List$concat(rankList)));
          var _v0 = A3(
              $elm$core$List$foldl,
              A3($goyalarchit$elm_dagre$Dagre$Position$BK$verticalAlignmentVisitLayer, pos, conflicts, neighbourFn),
              _Utils_Tuple2(root, align),
              rankList);
          var finalRoot = _v0.a;
          var finalAlign = _v0.b;
          return _Utils_Tuple2(finalRoot, finalAlign);
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$positionXHelper = F5(
      function (config, g, _v0, conflicts, _v1) {
          var rankList = _v0.a;
          var edges = _v0.b;
          var vDir = _v1.a;
          var hDir = _v1.b;
          var _v2 = function () {
              if (vDir.$ === 'Up') {
                  return _Utils_Tuple2(
                      rankList,
                      $goyalarchit$elm_dagre$Dagre$Utils$alongIncomingEdges(edges));
              } else {
                  return _Utils_Tuple2(
                      $elm$core$List$reverse(rankList),
                      $goyalarchit$elm_dagre$Dagre$Utils$alongOutgoingEdges(edges));
              }
          }();
          var intAdjustedRankList = _v2.a;
          var neighbourFn = _v2.b;
          var finalAdjustedRankList = function () {
              if (hDir.$ === 'Left') {
                  return intAdjustedRankList;
              } else {
                  return A2($elm$core$List$map, $elm$core$List$reverse, intAdjustedRankList);
              }
          }();
          var _v4 = A3($goyalarchit$elm_dagre$Dagre$Position$BK$verticalAlignment, finalAdjustedRankList, conflicts, neighbourFn);
          var root = _v4.a;
          var align = _v4.b;
          var xs = A4(
              $goyalarchit$elm_dagre$Dagre$Position$BK$horizontalCompaction,
              _Utils_Tuple2(config, g),
              finalAdjustedRankList,
              root,
              align);
          if (hDir.$ === 'Left') {
              return xs;
          } else {
              return A2(
                  $elm$core$Dict$map,
                  F2(
                      function (_v6, c) {
                          return -c;
                      }),
                  xs);
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$getAdjacentLayerPairs = function (rankList) {
      var toLayers = A2($elm$core$List$drop, 1, rankList);
      var fromLayers = A2(
          $elm$core$List$take,
          $elm$core$List$length(rankList) - 1,
          rankList);
      return A3(
          $elm$core$List$map2,
          F2(
              function (l1, l2) {
                  return _Utils_Tuple2(l1, l2);
              }),
          fromLayers,
          toLayers);
  };
  var $goyalarchit$elm_dagre$Dagre$Utils$filterEdgesByType = F2(
      function (eType, edges) {
          return A2(
              $elm$core$List$map,
              function (fe) {
                  return fe.a;
              },
              A2(
                  $elm$core$List$filter,
                  function (e) {
                      return _Utils_eq(e.b, eType);
                  },
                  edges));
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$getInEdges = F2(
      function (nodeId, edges) {
          return A2(
              $elm$core$List$filter,
              function (e) {
                  return _Utils_eq(e.a.b, nodeId);
              },
              edges);
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$findOtherInnerSegmentNode = F2(
      function (edges, nodeId) {
          var innerEdges = A2(
              $goyalarchit$elm_dagre$Dagre$Utils$filterEdgesByType,
              $goyalarchit$elm_dagre$Dagre$Utils$Inner,
              A2($goyalarchit$elm_dagre$Dagre$Utils$getInEdges, nodeId, edges));
          var upperNodeOfInnerSegments = A2($elm$core$List$map, $elm$core$Tuple$first, innerEdges);
          return $elm$core$List$minimum(upperNodeOfInnerSegments);
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$checkType1Conflict = F2(
      function (_v0, k) {
          var k0 = _v0.a;
          var k1 = _v0.b;
          return ((_Utils_cmp(k, k0) < 0) || (_Utils_cmp(k, k1) > 0)) ? true : false;
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$markType1Conflicts = F3(
      function (edges, _v0, l) {
          var k0 = _v0.a;
          var k1 = _v0.b;
          var nonInnerEdges = A2(
              $goyalarchit$elm_dagre$Dagre$Utils$filterEdgesByType,
              $goyalarchit$elm_dagre$Dagre$Utils$NonInner,
              A2($goyalarchit$elm_dagre$Dagre$Utils$getInEdges, l, edges));
          var conflictingNonInnerEdges = A2(
              $elm$core$List$filter,
              function (_v1) {
                  var f = _v1.a;
                  return A2(
                      $goyalarchit$elm_dagre$Dagre$Position$BK$checkType1Conflict,
                      _Utils_Tuple2(k0, k1),
                      f);
              },
              nonInnerEdges);
          return conflictingNonInnerEdges;
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$findInnerSegmentAndMarkConflicts = F4(
      function (_v0, edges, l1, _v1) {
          var prevLayerLength = _v0.a;
          var layerLength = _v0.b;
          var _v2 = _v1.a;
          var k0 = _v2.a;
          var scanPos = _v2.b;
          var type1Conflicts = _v1.b;
          var w = A2($goyalarchit$elm_dagre$Dagre$Position$BK$findOtherInnerSegmentNode, edges, l1);
          var _v3 = _Utils_Tuple2(
              w,
              _Utils_eq(l1, layerLength - 1));
          if (_v3.a.$ === 'Just') {
              var k1 = _v3.a.a;
              var subLayer = A2($elm$core$List$range, scanPos, l1);
              var newConflictsList = A2(
                  $elm$core$List$map,
                  A2(
                      $goyalarchit$elm_dagre$Dagre$Position$BK$markType1Conflicts,
                      edges,
                      _Utils_Tuple2(k0, k1)),
                  subLayer);
              var newConflicts = $elm$core$List$concat(newConflictsList);
              return _Utils_Tuple2(
                  _Utils_Tuple2(k1, l1 + 1),
                  A2($elm$core$List$append, type1Conflicts, newConflicts));
          } else {
              if (!_v3.b) {
                  var _v4 = _v3.a;
                  return _Utils_Tuple2(
                      _Utils_Tuple2(k0, scanPos),
                      type1Conflicts);
              } else {
                  var _v5 = _v3.a;
                  var subLayer = A2($elm$core$List$range, scanPos, l1);
                  var k1 = prevLayerLength - 1;
                  var newConflictsList = A2(
                      $elm$core$List$map,
                      A2(
                          $goyalarchit$elm_dagre$Dagre$Position$BK$markType1Conflicts,
                          edges,
                          _Utils_Tuple2(k0, k1)),
                      subLayer);
                  var newConflicts = $elm$core$List$concat(newConflictsList);
                  return _Utils_Tuple2(
                      _Utils_Tuple2(k1, l1 + 1),
                      A2($elm$core$List$append, type1Conflicts, newConflicts));
              }
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$getEdgesWithTypeDirectedFromLayers = F2(
      function (_v0, edges) {
          var l1 = _v0.a;
          var l2 = _v0.b;
          return A2(
              $elm$core$List$filter,
              function (_v1) {
                  var _v2 = _v1.a;
                  var from = _v2.a;
                  var to = _v2.b;
                  return A2($elm$core$List$member, from, l1) && A2($elm$core$List$member, to, l2);
              },
              edges);
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$getNodeFromOrder = F2(
      function (l, order) {
          var _v0 = A2($elm_community$list_extra$List$Extra$getAt, order, l);
          if (_v0.$ === 'Just') {
              var n = _v0.a;
              return n;
          } else {
              return $goyalarchit$elm_dagre$Dagre$Utils$intMin;
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$mapEdgeOrderToNode = F2(
      function (_v0, e) {
          var l1 = _v0.a;
          var l2 = _v0.b;
          return A3(
              $elm$core$Tuple$mapBoth,
              $goyalarchit$elm_dagre$Dagre$Utils$getNodeFromOrder(l1),
              $goyalarchit$elm_dagre$Dagre$Utils$getNodeFromOrder(l2),
              e);
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$mapEdgeToOrder = F2(
      function (_v0, e) {
          var l1 = _v0.a;
          var l2 = _v0.b;
          return A3(
              $elm$core$Tuple$mapBoth,
              $goyalarchit$elm_dagre$Dagre$Utils$getOrder(l1),
              $goyalarchit$elm_dagre$Dagre$Utils$getOrder(l2),
              e);
      });
  var $elm$core$Tuple$mapFirst = F2(
      function (func, _v0) {
          var x = _v0.a;
          var y = _v0.b;
          return _Utils_Tuple2(
              func(x),
              y);
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$mapEdgeWithTypeToOrder = F2(
      function (_v0, e) {
          var l1 = _v0.a;
          var l2 = _v0.b;
          return A2(
              $elm$core$Tuple$mapFirst,
              $goyalarchit$elm_dagre$Dagre$Utils$mapEdgeToOrder(
                  _Utils_Tuple2(l1, l2)),
              e);
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$type1VisitLayer = F2(
      function (edges, _v0) {
          var l1 = _v0.a;
          var l2 = _v0.b;
          var reqEdges = A2(
              $elm$core$List$map,
              $goyalarchit$elm_dagre$Dagre$Utils$mapEdgeWithTypeToOrder(
                  _Utils_Tuple2(l1, l2)),
              A2(
                  $goyalarchit$elm_dagre$Dagre$Utils$getEdgesWithTypeDirectedFromLayers,
                  _Utils_Tuple2(l1, l2),
                  edges));
          var prevLayerLength = $elm$core$List$length(l1);
          var layerLength = $elm$core$List$length(l2);
          var rawType1Conflicts = A3(
              $elm$core$List$foldl,
              A2(
                  $goyalarchit$elm_dagre$Dagre$Position$BK$findInnerSegmentAndMarkConflicts,
                  _Utils_Tuple2(prevLayerLength, layerLength),
                  reqEdges),
              _Utils_Tuple2(
                  _Utils_Tuple2(0, 0),
                  _List_Nil),
              A2($elm$core$List$range, 0, layerLength - 1)).b;
          var type1Conflicts = A2(
              $elm$core$List$map,
              $goyalarchit$elm_dagre$Dagre$Utils$mapEdgeOrderToNode(
                  _Utils_Tuple2(l1, l2)),
              rawType1Conflicts);
          return type1Conflicts;
      });
  var $goyalarchit$elm_dagre$Dagre$Position$BK$findType1Conflicts = function (_v0) {
      var rankList = _v0.a;
      var edges = _v0.b;
      var adjacentLayers = $goyalarchit$elm_dagre$Dagre$Utils$getAdjacentLayerPairs(rankList);
      return $elm$core$List$concat(
          A2(
              $elm$core$List$map,
              $goyalarchit$elm_dagre$Dagre$Position$BK$type1VisitLayer(edges),
              adjacentLayers));
  };
  var $goyalarchit$elm_dagre$Dagre$Position$BK$preprocessing = function (_v0) {
      var rankList = _v0.a;
      var edges = _v0.b;
      var allType1Conflicts = $goyalarchit$elm_dagre$Dagre$Position$BK$findType1Conflicts(
          _Utils_Tuple2(rankList, edges));
      return _Utils_Tuple2(allType1Conflicts, _List_Nil);
  };
  var $goyalarchit$elm_dagre$Dagre$Position$BK$positionX = F3(
      function (config, g, _v0) {
          var rankList = _v0.a;
          var edges = _v0.b;
          var vhDir = $elm$core$List$concat(
              A2(
                  $elm$core$List$map,
                  function (v) {
                      return A2(
                          $elm$core$List$map,
                          function (h) {
                              return _Utils_Tuple2(v, h);
                          },
                          _List_fromArray(
                              [$goyalarchit$elm_dagre$Dagre$Position$BK$Left, $goyalarchit$elm_dagre$Dagre$Position$BK$Right]));
                  },
                  _List_fromArray(
                      [$goyalarchit$elm_dagre$Dagre$Position$BK$Up, $goyalarchit$elm_dagre$Dagre$Position$BK$Down])));
          var edgesWithType = A2($goyalarchit$elm_dagre$Dagre$Utils$markEdgesWithEdgeType, g, edges);
          var _v1 = $goyalarchit$elm_dagre$Dagre$Position$BK$preprocessing(
              _Utils_Tuple2(rankList, edgesWithType));
          var type1Conflicts = _v1.a;
          var conflicts = type1Conflicts;
          var xss = A2(
              $elm$core$List$map,
              function (d) {
                  return _Utils_Tuple2(
                      d,
                      A5(
                          $goyalarchit$elm_dagre$Dagre$Position$BK$positionXHelper,
                          config,
                          g,
                          _Utils_Tuple2(rankList, edges),
                          conflicts,
                          d));
              },
              vhDir);
          var smallestWidthAlign = A2(
              $goyalarchit$elm_dagre$Dagre$Position$BK$findSmallestWidthAlignment,
              config,
              A2($elm$core$List$map, $elm$core$Tuple$second, xss));
          var alignedXss = A2($goyalarchit$elm_dagre$Dagre$Position$BK$alignCoordinates, xss, smallestWidthAlign);
          return $goyalarchit$elm_dagre$Dagre$Position$BK$balance(alignedXss);
      });
  var $goyalarchit$elm_dagre$Dagre$Position$height = function (config) {
      return function (n) {
          return A2(
              $elm$core$Maybe$withDefault,
              config.height,
              A2($elm$core$Dict$get, n, config.heightDict));
      };
  };
  var $goyalarchit$elm_dagre$Dagre$Position$assignAbsoluteY = F3(
      function (config, l, _v0) {
          var currentY = _v0.a;
          var ys = _v0.b;
          var getHeight = $goyalarchit$elm_dagre$Dagre$Position$height(config);
          var maxHeight = A2(
              $elm$core$Maybe$withDefault,
              config.height,
              $elm$core$List$maximum(
                  A2($elm$core$List$map, getHeight, l)));
          var newY = (currentY + maxHeight) + config.rankSep;
          var ys_updated = A3(
              $elm$core$List$foldl,
              F2(
                  function (n, ys_) {
                      return A3($elm$core$Dict$insert, n, currentY + (maxHeight / 2), ys_);
                  }),
              ys,
              l);
          return _Utils_Tuple2(newY, ys_updated);
      });
  var $goyalarchit$elm_dagre$Dagre$Position$positionY = F2(
      function (config, rankList) {
          var ys = $elm$core$Dict$empty;
          var _v0 = A3(
              $elm$core$List$foldl,
              $goyalarchit$elm_dagre$Dagre$Position$assignAbsoluteY(config),
              _Utils_Tuple2(0, ys),
              rankList);
          var ys_assigned = _v0.b;
          return ys_assigned;
      });
  var $elm_community$list_extra$List$Extra$maximumBy = F2(
      function (f, ls) {
          var maxBy = F2(
              function (x, _v1) {
                  var y = _v1.a;
                  var fy = _v1.b;
                  var fx = f(x);
                  return (_Utils_cmp(fx, fy) > 0) ? _Utils_Tuple2(x, fx) : _Utils_Tuple2(y, fy);
              });
          if (ls.b) {
              if (!ls.b.b) {
                  var l_ = ls.a;
                  return $elm$core$Maybe$Just(l_);
              } else {
                  var l_ = ls.a;
                  var ls_ = ls.b;
                  return $elm$core$Maybe$Just(
                      A3(
                          $elm$core$List$foldl,
                          maxBy,
                          _Utils_Tuple2(
                              l_,
                              f(l_)),
                          ls_).a);
              }
          } else {
              return $elm$core$Maybe$Nothing;
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Position$translate = F2(
      function (config, coords) {
          var getWidth = $goyalarchit$elm_dagre$Dagre$Position$BK$width(config);
          var getHeight = $goyalarchit$elm_dagre$Dagre$Position$height(config);
          var coordsWithMinXY = $elm$core$Dict$values(
              A2(
                  $elm$core$Dict$map,
                  F2(
                      function (n, _v3) {
                          var x = _v3.a;
                          var y = _v3.b;
                          return _Utils_Tuple2(
                              x - (getWidth(n) / 2),
                              y - (getHeight(n) / 2));
                      }),
                  coords));
          var minX = A2(
              $elm$core$Maybe$withDefault,
              _Utils_Tuple2(0, 0),
              A2($elm_community$list_extra$List$Extra$minimumBy, $elm$core$Tuple$first, coordsWithMinXY)).a - config.marginX;
          var minY = A2(
              $elm$core$Maybe$withDefault,
              _Utils_Tuple2(0, 0),
              A2($elm_community$list_extra$List$Extra$minimumBy, $elm$core$Tuple$second, coordsWithMinXY)).b - config.marginY;
          var coordsWithMaxXY = $elm$core$Dict$values(
              A2(
                  $elm$core$Dict$map,
                  F2(
                      function (n, _v2) {
                          var x = _v2.a;
                          var y = _v2.b;
                          return _Utils_Tuple2(
                              x + (getWidth(n) / 2),
                              y + (getHeight(n) / 2));
                      }),
                  coords));
          var maxX = (A2(
              $elm$core$Maybe$withDefault,
              _Utils_Tuple2(500, 500),
              A2($elm_community$list_extra$List$Extra$maximumBy, $elm$core$Tuple$first, coordsWithMaxXY)).a - minX) + config.marginX;
          var maxY = (A2(
              $elm$core$Maybe$withDefault,
              _Utils_Tuple2(500, 500),
              A2($elm_community$list_extra$List$Extra$maximumBy, $elm$core$Tuple$second, coordsWithMaxXY)).b - minY) + config.marginY;
          return _Utils_Tuple2(
              A2(
                  $elm$core$Dict$map,
                  F2(
                      function (_v0, _v1) {
                          var x = _v1.a;
                          var y = _v1.b;
                          return _Utils_Tuple2(x - minX, y - minY);
                      }),
                  coords),
              _Utils_Tuple2(maxX, maxY));
      });
  var $goyalarchit$elm_dagre$Dagre$Position$position = F3(
      function (config, g, _v0) {
          var rankList = _v0.a;
          var edges = _v0.b;
          var adjustedConfig = (_Utils_eq(config.rankDir, $goyalarchit$elm_dagre$Dagre$Attributes$LR) || _Utils_eq(config.rankDir, $goyalarchit$elm_dagre$Dagre$Attributes$RL)) ? _Utils_update(
              config,
              {height: config.width, heightDict: config.widthDict, width: config.height, widthDict: config.heightDict}) : config;
          var xs = A3(
              $goyalarchit$elm_dagre$Dagre$Position$BK$positionX,
              adjustedConfig,
              g,
              _Utils_Tuple2(rankList, edges));
          var ys = A2($goyalarchit$elm_dagre$Dagre$Position$positionY, adjustedConfig, rankList);
          var init_coords = A2($goyalarchit$elm_dagre$Dagre$Position$combinePoints, xs, ys);
          var final_coords = A2($goyalarchit$elm_dagre$Dagre$Position$applyRankDir, adjustedConfig.rankDir, init_coords);
          return A2($goyalarchit$elm_dagre$Dagre$Position$translate, config, final_coords);
      });
  var $elm_community$graph$Graph$AcyclicGraph = F2(
      function (a, b) {
          return {$: 'AcyclicGraph', a: a, b: b};
      });
  var $elm$core$Result$andThen = F2(
      function (callback, result) {
          if (result.$ === 'Ok') {
              var value = result.a;
              return callback(value);
          } else {
              var msg = result.a;
              return $elm$core$Result$Err(msg);
          }
      });
  var $elm_community$intdict$IntDict$Disjunct = F2(
      function (a, b) {
          return {$: 'Disjunct', a: a, b: b};
      });
  var $elm_community$intdict$IntDict$Left = {$: 'Left'};
  var $elm_community$intdict$IntDict$Parent = F2(
      function (a, b) {
          return {$: 'Parent', a: a, b: b};
      });
  var $elm_community$intdict$IntDict$Right = {$: 'Right'};
  var $elm_community$intdict$IntDict$SamePrefix = {$: 'SamePrefix'};
  var $elm_community$intdict$IntDict$combineBits = F3(
      function (a, b, mask) {
          return (a & (~mask)) | (b & mask);
      });
  var $elm_community$intdict$IntDict$mostSignificantBranchingBit = F2(
      function (a, b) {
          return (_Utils_eq(a, $elm_community$intdict$IntDict$signBit) || _Utils_eq(b, $elm_community$intdict$IntDict$signBit)) ? $elm_community$intdict$IntDict$signBit : A2($elm$core$Basics$max, a, b);
      });
  var $elm_community$intdict$IntDict$determineBranchRelation = F2(
      function (l, r) {
          var rp = r.prefix;
          var lp = l.prefix;
          var mask = $elm_community$intdict$IntDict$highestBitSet(
              A2($elm_community$intdict$IntDict$mostSignificantBranchingBit, lp.branchingBit, rp.branchingBit));
          var modifiedRightPrefix = A3($elm_community$intdict$IntDict$combineBits, rp.prefixBits, ~lp.prefixBits, mask);
          var prefix = A2($elm_community$intdict$IntDict$lcp, lp.prefixBits, modifiedRightPrefix);
          var childEdge = F2(
              function (branchPrefix, c) {
                  return A2($elm_community$intdict$IntDict$isBranchingBitSet, branchPrefix, c.prefix.prefixBits) ? $elm_community$intdict$IntDict$Right : $elm_community$intdict$IntDict$Left;
              });
          return _Utils_eq(lp, rp) ? $elm_community$intdict$IntDict$SamePrefix : (_Utils_eq(prefix, lp) ? A2(
              $elm_community$intdict$IntDict$Parent,
              $elm_community$intdict$IntDict$Left,
              A2(childEdge, l.prefix, r)) : (_Utils_eq(prefix, rp) ? A2(
              $elm_community$intdict$IntDict$Parent,
              $elm_community$intdict$IntDict$Right,
              A2(childEdge, r.prefix, l)) : A2(
              $elm_community$intdict$IntDict$Disjunct,
              prefix,
              A2(childEdge, prefix, l))));
      });
  var $elm_community$intdict$IntDict$intersect = F2(
      function (l, r) {
          intersect:
          while (true) {
              var _v0 = _Utils_Tuple2(l, r);
              _v0$1:
              while (true) {
                  _v0$2:
                  while (true) {
                      switch (_v0.a.$) {
                          case 'Empty':
                              var _v1 = _v0.a;
                              return $elm_community$intdict$IntDict$Empty;
                          case 'Leaf':
                              switch (_v0.b.$) {
                                  case 'Empty':
                                      break _v0$1;
                                  case 'Leaf':
                                      break _v0$2;
                                  default:
                                      break _v0$2;
                              }
                          default:
                              switch (_v0.b.$) {
                                  case 'Empty':
                                      break _v0$1;
                                  case 'Leaf':
                                      var lr = _v0.b.a;
                                      var _v3 = A2($elm_community$intdict$IntDict$get, lr.key, l);
                                      if (_v3.$ === 'Just') {
                                          var v = _v3.a;
                                          return A2($elm_community$intdict$IntDict$leaf, lr.key, v);
                                      } else {
                                          return $elm_community$intdict$IntDict$Empty;
                                      }
                                  default:
                                      var il = _v0.a.a;
                                      var ir = _v0.b.a;
                                      var _v4 = A2($elm_community$intdict$IntDict$determineBranchRelation, il, ir);
                                      switch (_v4.$) {
                                          case 'SamePrefix':
                                              return A3(
                                                  $elm_community$intdict$IntDict$inner,
                                                  il.prefix,
                                                  A2($elm_community$intdict$IntDict$intersect, il.left, ir.left),
                                                  A2($elm_community$intdict$IntDict$intersect, il.right, ir.right));
                                          case 'Parent':
                                              if (_v4.a.$ === 'Left') {
                                                  if (_v4.b.$ === 'Right') {
                                                      var _v5 = _v4.a;
                                                      var _v6 = _v4.b;
                                                      var $temp$l = il.right,
                                                          $temp$r = r;
                                                      l = $temp$l;
                                                      r = $temp$r;
                                                      continue intersect;
                                                  } else {
                                                      var _v9 = _v4.a;
                                                      var _v10 = _v4.b;
                                                      var $temp$l = il.left,
                                                          $temp$r = r;
                                                      l = $temp$l;
                                                      r = $temp$r;
                                                      continue intersect;
                                                  }
                                              } else {
                                                  if (_v4.b.$ === 'Right') {
                                                      var _v7 = _v4.a;
                                                      var _v8 = _v4.b;
                                                      var $temp$l = l,
                                                          $temp$r = ir.right;
                                                      l = $temp$l;
                                                      r = $temp$r;
                                                      continue intersect;
                                                  } else {
                                                      var _v11 = _v4.a;
                                                      var _v12 = _v4.b;
                                                      var $temp$l = l,
                                                          $temp$r = ir.left;
                                                      l = $temp$l;
                                                      r = $temp$r;
                                                      continue intersect;
                                                  }
                                              }
                                          default:
                                              return $elm_community$intdict$IntDict$Empty;
                                      }
                              }
                      }
                  }
                  var ll = _v0.a.a;
                  return A2($elm_community$intdict$IntDict$member, ll.key, r) ? l : $elm_community$intdict$IntDict$Empty;
              }
              var _v2 = _v0.b;
              return $elm_community$intdict$IntDict$Empty;
          }
      });
  var $elm$core$Result$map = F2(
      function (func, ra) {
          if (ra.$ === 'Ok') {
              var a = ra.a;
              return $elm$core$Result$Ok(
                  func(a));
          } else {
              var e = ra.a;
              return $elm$core$Result$Err(e);
          }
      });
  var $elm_community$graph$Graph$unsafeGet = F3(
      function (msg, id, graph) {
          var _v0 = A2($elm_community$graph$Graph$get, id, graph);
          if (_v0.$ === 'Nothing') {
              return $elm_community$graph$Graph$crashHack(msg);
          } else {
              var ctx = _v0.a;
              return ctx;
          }
      });
  var $elm_community$graph$Graph$checkForBackEdges = F2(
      function (ordering, graph) {
          var success = function (_v3) {
              return A2($elm_community$graph$Graph$AcyclicGraph, graph, ordering);
          };
          var check = F2(
              function (id, _v2) {
                  var backSet = _v2.a;
                  var error = 'Graph.checkForBackEdges: `ordering` didn\'t contain `id`';
                  var ctx = A3($elm_community$graph$Graph$unsafeGet, error, id, graph);
                  var backSetWithId = A3($elm_community$intdict$IntDict$insert, id, _Utils_Tuple0, backSet);
                  var backEdges = A2($elm_community$intdict$IntDict$intersect, ctx.outgoing, backSetWithId);
                  var _v0 = $elm_community$intdict$IntDict$findMin(backEdges);
                  if (_v0.$ === 'Nothing') {
                      return $elm$core$Result$Ok(
                          _Utils_Tuple2(backSetWithId, _Utils_Tuple0));
                  } else {
                      var _v1 = _v0.a;
                      var to = _v1.a;
                      var label = _v1.b;
                      return $elm$core$Result$Err(
                          A3($elm_community$graph$Graph$Edge, id, to, label));
                  }
              });
          return A2(
              $elm$core$Result$map,
              success,
              A3(
                  $elm$core$List$foldl,
                  F2(
                      function (id, res) {
                          return A2(
                              $elm$core$Result$andThen,
                              check(id),
                              res);
                      }),
                  $elm$core$Result$Ok(
                      _Utils_Tuple2($elm_community$intdict$IntDict$empty, _Utils_Tuple0)),
                  ordering));
      });
  var $elm_community$intdict$IntDict$keys = function (dict) {
      return A3(
          $elm_community$intdict$IntDict$foldr,
          F3(
              function (key, value, keyList) {
                  return A2($elm$core$List$cons, key, keyList);
              }),
          _List_Nil,
          dict);
  };
  var $elm_community$graph$Graph$alongOutgoingEdges = function (ctx) {
      return $elm_community$intdict$IntDict$keys(ctx.outgoing);
  };
  var $elm_community$graph$Graph$guidedDfs = F5(
      function (selectNeighbors, visitNode, startingSeeds, startingAcc, startingGraph) {
          var go = F3(
              function (seeds, acc, graph) {
                  go:
                  while (true) {
                      if (!seeds.b) {
                          return _Utils_Tuple2(acc, graph);
                      } else {
                          var next = seeds.a;
                          var seeds1 = seeds.b;
                          var _v1 = A2($elm_community$graph$Graph$get, next, graph);
                          if (_v1.$ === 'Nothing') {
                              var $temp$seeds = seeds1,
                                  $temp$acc = acc,
                                  $temp$graph = graph;
                              seeds = $temp$seeds;
                              acc = $temp$acc;
                              graph = $temp$graph;
                              continue go;
                          } else {
                              var ctx = _v1.a;
                              var _v2 = A2(visitNode, ctx, acc);
                              var accAfterDiscovery = _v2.a;
                              var finishNode = _v2.b;
                              var _v3 = A3(
                                  go,
                                  selectNeighbors(ctx),
                                  accAfterDiscovery,
                                  A2($elm_community$graph$Graph$remove, next, graph));
                              var accBeforeFinish = _v3.a;
                              var graph1 = _v3.b;
                              var accAfterFinish = finishNode(accBeforeFinish);
                              var $temp$seeds = seeds1,
                                  $temp$acc = accAfterFinish,
                                  $temp$graph = graph1;
                              seeds = $temp$seeds;
                              acc = $temp$acc;
                              graph = $temp$graph;
                              continue go;
                          }
                      }
                  }
              });
          return A3(go, startingSeeds, startingAcc, startingGraph);
      });
  var $elm_community$graph$Graph$nodeIds = A2($elm$core$Basics$composeR, $elm_community$graph$Graph$unGraph, $elm_community$intdict$IntDict$keys);
  var $elm_community$graph$Graph$dfs = F3(
      function (visitNode, acc, graph) {
          return A5(
              $elm_community$graph$Graph$guidedDfs,
              $elm_community$graph$Graph$alongOutgoingEdges,
              visitNode,
              $elm_community$graph$Graph$nodeIds(graph),
              acc,
              graph).a;
      });
  var $elm_community$graph$Graph$onFinish = F3(
      function (visitor, ctx, acc) {
          return _Utils_Tuple2(
              acc,
              visitor(ctx));
      });
  var $elm_community$graph$Graph$checkAcyclic = function (graph) {
      var reversePostOrder = A3(
          $elm_community$graph$Graph$dfs,
          $elm_community$graph$Graph$onFinish(
              A2(
                  $elm$core$Basics$composeR,
                  function ($) {
                      return $.node;
                  },
                  A2(
                      $elm$core$Basics$composeR,
                      function ($) {
                          return $.id;
                      },
                      $elm$core$List$cons))),
          _List_Nil,
          graph);
      return A2($elm_community$graph$Graph$checkForBackEdges, reversePostOrder, graph);
  };
  var $elm_community$intdict$IntDict$remove = F2(
      function (key, dict) {
          return A3(
              $elm_community$intdict$IntDict$update,
              key,
              $elm$core$Basics$always($elm$core$Maybe$Nothing),
              dict);
      });
  var $goyalarchit$elm_dagre$Dagre$Acyclic$updateEdge = F2(
      function (e, graph) {
          var reverse = function (nodeCtx) {
              return _Utils_update(
                  nodeCtx,
                  {
                      incoming: A3($elm_community$intdict$IntDict$insert, e.to, e.label, nodeCtx.incoming),
                      outgoing: A2($elm_community$intdict$IntDict$remove, e.to, nodeCtx.outgoing)
                  });
          };
          var remove = function (nodeCtx) {
              return _Utils_update(
                  nodeCtx,
                  {
                      incoming: A2($elm_community$intdict$IntDict$remove, e.from, nodeCtx.incoming),
                      outgoing: A2($elm_community$intdict$IntDict$remove, e.to, nodeCtx.outgoing)
                  });
          };
          return _Utils_eq(e.from, e.to) ? A3(
              $elm_community$graph$Graph$update,
              e.from,
              $elm$core$Maybe$map(remove),
              graph) : A3(
              $elm_community$graph$Graph$update,
              e.from,
              $elm$core$Maybe$map(reverse),
              graph);
      });
  var $goyalarchit$elm_dagre$Dagre$Acyclic$makeAcyclic = function (_v0) {
      makeAcyclic:
      while (true) {
          var graph = _v0.a;
          var reversedEdges = _v0.b;
          var _v1 = $elm_community$graph$Graph$checkAcyclic(graph);
          if (_v1.$ === 'Ok') {
              var g = _v1.a;
              return _Utils_Tuple3(graph, g, reversedEdges);
          } else {
              var e = _v1.a;
              var newGraph = A2($goyalarchit$elm_dagre$Dagre$Acyclic$updateEdge, e, graph);
              var errorEdge = _Utils_Tuple2(e.to, e.from);
              var $temp$_v0 = _Utils_Tuple2(
                  newGraph,
                  A2($elm$core$List$cons, errorEdge, reversedEdges));
              _v0 = $temp$_v0;
              continue makeAcyclic;
          }
      }
  };
  var $goyalarchit$elm_dagre$Dagre$Acyclic$run = function (graph) {
      return $goyalarchit$elm_dagre$Dagre$Acyclic$makeAcyclic(
          _Utils_Tuple2(graph, _List_Nil));
  };
  var $goyalarchit$elm_dagre$Dagre$Acyclic$undoHelper = F3(
      function (originalEdges, e, controlPoints) {
          var controlPoints_e = A2(
              $elm$core$Maybe$withDefault,
              _List_Nil,
              A2($elm$core$Dict$get, e, controlPoints));
          var _v0 = e;
          var from = _v0.a;
          var to = _v0.b;
          return A2(
              $elm$core$List$member,
              _Utils_Tuple2(from, to),
              originalEdges) ? A3(
              $elm$core$Dict$insert,
              _Utils_Tuple2(to, from),
              $elm$core$List$reverse(controlPoints_e),
              controlPoints) : A3(
              $elm$core$Dict$insert,
              _Utils_Tuple2(to, from),
              $elm$core$List$reverse(controlPoints_e),
              A2(
                  $elm$core$Dict$remove,
                  _Utils_Tuple2(from, to),
                  controlPoints));
      });
  var $goyalarchit$elm_dagre$Dagre$Acyclic$undo = F3(
      function (originalEdges, reveresedEdges, controlPoints) {
          return A3(
              $elm$core$List$foldl,
              $goyalarchit$elm_dagre$Dagre$Acyclic$undoHelper(originalEdges),
              controlPoints,
              reveresedEdges);
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$getEdgesDirectedFromLayers = F2(
      function (_v0, edges) {
          var l1 = _v0.a;
          var l2 = _v0.b;
          return A2(
              $elm$core$List$filter,
              function (_v1) {
                  var from = _v1.a;
                  var to = _v1.b;
                  return A2($elm$core$List$member, from, l1) && A2($elm$core$List$member, to, l2);
              },
              edges);
      });
  var $elm_community$list_extra$List$Extra$dropWhile = F2(
      function (predicate, list) {
          dropWhile:
          while (true) {
              if (!list.b) {
                  return _List_Nil;
              } else {
                  var x = list.a;
                  var xs = list.b;
                  if (predicate(x)) {
                      var $temp$predicate = predicate,
                          $temp$list = xs;
                      predicate = $temp$predicate;
                      list = $temp$list;
                      continue dropWhile;
                  } else {
                      return list;
                  }
              }
          }
      });
  var $elm_community$list_extra$List$Extra$takeWhile = function (predicate) {
      var takeWhileMemo = F2(
          function (memo, list) {
              takeWhileMemo:
              while (true) {
                  if (!list.b) {
                      return $elm$core$List$reverse(memo);
                  } else {
                      var x = list.a;
                      var xs = list.b;
                      if (predicate(x)) {
                          var $temp$memo = A2($elm$core$List$cons, x, memo),
                              $temp$list = xs;
                          memo = $temp$memo;
                          list = $temp$list;
                          continue takeWhileMemo;
                      } else {
                          return $elm$core$List$reverse(memo);
                      }
                  }
              }
          });
      return takeWhileMemo(_List_Nil);
  };
  var $goyalarchit$elm_dagre$Dagre$Order$CrossCount$insertIntoSortedWithInversions = F3(
      function (p, e, _v0) {
          var prevInversions = _v0.a;
          var nodes = _v0.b;
          var _v1 = _Utils_Tuple2(
              A2($elm$core$List$take, p, nodes),
              A2($elm$core$List$drop, p + 1, nodes));
          var sorted = _v1.a;
          var unsorted = _v1.b;
          var _v2 = _Utils_Tuple2(
              A2(
                  $elm_community$list_extra$List$Extra$takeWhile,
                  function (n) {
                      return _Utils_cmp(n, e) < 1;
                  },
                  sorted),
              A2(
                  $elm_community$list_extra$List$Extra$dropWhile,
                  function (n) {
                      return _Utils_cmp(n, e) < 1;
                  },
                  sorted));
          var lesser = _v2.a;
          var greater = _v2.b;
          var finalNodes = $elm$core$List$concat(
              _List_fromArray(
                  [
                      lesser,
                      _List_fromArray(
                      [e]),
                      greater,
                      unsorted
                  ]));
          return _Utils_Tuple2(
              prevInversions + $elm$core$List$length(greater),
              finalNodes);
      });
  var $goyalarchit$elm_dagre$Dagre$Order$CrossCount$insertionSortWithInversionAccumulator = function (nodes) {
      return A3(
          $elm_community$list_extra$List$Extra$indexedFoldl,
          $goyalarchit$elm_dagre$Dagre$Order$CrossCount$insertIntoSortedWithInversions,
          _Utils_Tuple2(0, nodes),
          nodes);
  };
  var $goyalarchit$elm_dagre$Dagre$Order$CrossCount$lexSortEdge = F2(
      function (_v0, _v1) {
          var f1 = _v0.a;
          var t1 = _v0.b;
          var f2 = _v1.a;
          var t2 = _v1.b;
          var _v2 = A2($elm$core$Basics$compare, f1, f2);
          switch (_v2.$) {
              case 'LT':
                  return $elm$core$Basics$LT;
              case 'EQ':
                  return A2($elm$core$Basics$compare, t1, t2);
              default:
                  return $elm$core$Basics$GT;
          }
      });
  var $elm$core$List$sortWith = _List_sortWith;
  var $goyalarchit$elm_dagre$Dagre$Order$CrossCount$mapAndSortEdges = F2(
      function (_v0, edges) {
          var l1 = _v0.a;
          var l2 = _v0.b;
          var mappedEdges = A2(
              $elm$core$List$map,
              $goyalarchit$elm_dagre$Dagre$Utils$mapEdgeToOrder(
                  _Utils_Tuple2(l1, l2)),
              edges);
          var sortedEdges = A2($elm$core$List$sortWith, $goyalarchit$elm_dagre$Dagre$Order$CrossCount$lexSortEdge, mappedEdges);
          var southernPoints = A2(
              $elm$core$List$map,
              function (_v1) {
                  var to = _v1.b;
                  return to;
              },
              sortedEdges);
          return southernPoints;
      });
  var $goyalarchit$elm_dagre$Dagre$Order$CrossCount$biLayerCrossCount = F2(
      function (edges, _v0) {
          var l1 = _v0.a;
          var l2 = _v0.b;
          var reqEdges = A2(
              $goyalarchit$elm_dagre$Dagre$Utils$getEdgesDirectedFromLayers,
              _Utils_Tuple2(l1, l2),
              edges);
          var reqSouthernPoints = A2(
              $goyalarchit$elm_dagre$Dagre$Order$CrossCount$mapAndSortEdges,
              _Utils_Tuple2(l1, l2),
              reqEdges);
          var _v1 = $goyalarchit$elm_dagre$Dagre$Order$CrossCount$insertionSortWithInversionAccumulator(reqSouthernPoints);
          var totalCrossings = _v1.a;
          return totalCrossings;
      });
  var $goyalarchit$elm_dagre$Dagre$Order$CrossCount$crossCount = function (_v0) {
      var rankList = _v0.a;
      var edges = _v0.b;
      var toLayers = A2($elm$core$List$drop, 1, rankList);
      var fromLayers = A2(
          $elm$core$List$take,
          $elm$core$List$length(rankList) - 1,
          rankList);
      var adjacentLayers = A3(
          $elm$core$List$map2,
          F2(
              function (l1, l2) {
                  return _Utils_Tuple2(l1, l2);
              }),
          fromLayers,
          toLayers);
      var cc = A3(
          $elm$core$List$foldl,
          $elm$core$Basics$add,
          0,
          A2(
              $elm$core$List$map,
              $goyalarchit$elm_dagre$Dagre$Order$CrossCount$biLayerCrossCount(edges),
              adjacentLayers));
      return cc;
  };
  var $goyalarchit$elm_dagre$Dagre$Order$Init$initOrder = function (layering) {
      return A2($elm$core$List$map, $elm$core$List$sort, layering);
  };
  var $goyalarchit$elm_dagre$Dagre$Order$Barycenter$NextLayer = {$: 'NextLayer'};
  var $goyalarchit$elm_dagre$Dagre$Order$Barycenter$PreviousLayer = {$: 'PreviousLayer'};
  var $elm$core$List$sum = function (numbers) {
      return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
  };
  var $goyalarchit$elm_dagre$Dagre$Order$Barycenter$calcBarycenter = F3(
      function (nodeId, neighbourFn, adjLayer) {
          var adj_nodes = neighbourFn(nodeId);
          var adj_positions = A2(
              $elm$core$List$map,
              $goyalarchit$elm_dagre$Dagre$Utils$getOrder(adjLayer),
              adj_nodes);
          return $elm$core$List$isEmpty(adj_positions) ? (-1) : ($elm$core$List$sum(adj_positions) / $elm$core$List$length(adj_positions));
      });
  var $goyalarchit$elm_dagre$Dagre$Utils$getLayer = F2(
      function (rank, layering) {
          var layer = A2($elm_community$list_extra$List$Extra$getAt, rank, layering);
          return A2($elm$core$Maybe$withDefault, _List_Nil, layer);
      });
  var $elm_community$list_extra$List$Extra$setAt = F2(
      function (index, value) {
          return A2(
              $elm_community$list_extra$List$Extra$updateAt,
              index,
              $elm$core$Basics$always(value));
      });
  var $goyalarchit$elm_dagre$Dagre$Order$Barycenter$barycenter = F4(
      function (edges, fixedLayer, movableLayerRank, layering) {
          var movableLayer = A2($goyalarchit$elm_dagre$Dagre$Utils$getLayer, movableLayerRank, layering);
          var _v0 = function () {
              if (fixedLayer.$ === 'PreviousLayer') {
                  return _Utils_Tuple2(
                      $goyalarchit$elm_dagre$Dagre$Utils$alongIncomingEdges(edges),
                      A2($goyalarchit$elm_dagre$Dagre$Utils$getLayer, movableLayerRank - 1, layering));
              } else {
                  return _Utils_Tuple2(
                      $goyalarchit$elm_dagre$Dagre$Utils$alongOutgoingEdges(edges),
                      A2($goyalarchit$elm_dagre$Dagre$Utils$getLayer, movableLayerRank + 1, layering));
              }
          }();
          var neighbourFn = _v0.a;
          var adjLayer = _v0.b;
          var baryCenterValues = A2(
              $elm$core$List$map,
              function (n) {
                  return _Utils_Tuple2(
                      n,
                      A3($goyalarchit$elm_dagre$Dagre$Order$Barycenter$calcBarycenter, n, neighbourFn, adjLayer));
              },
              movableLayer);
          var newOrder = A2(
              $elm$core$List$map,
              $elm$core$Tuple$first,
              A2($elm$core$List$sortBy, $elm$core$Tuple$second, baryCenterValues));
          return A3($elm_community$list_extra$List$Extra$setAt, movableLayerRank, newOrder, layering);
      });
  var $elm$core$Basics$modBy = _Basics_modBy;
  var $goyalarchit$elm_dagre$Dagre$Order$sweepLayers = F2(
      function (_v0, iter) {
          var layering = _v0.a;
          var edges = _v0.b;
          var maxRank = $elm$core$List$length(layering) - 1;
          return (!A2($elm$core$Basics$modBy, 2, iter)) ? A3(
              $elm$core$List$foldl,
              A2($goyalarchit$elm_dagre$Dagre$Order$Barycenter$barycenter, edges, $goyalarchit$elm_dagre$Dagre$Order$Barycenter$PreviousLayer),
              layering,
              A2($elm$core$List$range, 1, maxRank)) : A3(
              $elm$core$List$foldl,
              A2($goyalarchit$elm_dagre$Dagre$Order$Barycenter$barycenter, edges, $goyalarchit$elm_dagre$Dagre$Order$Barycenter$NextLayer),
              layering,
              $elm$core$List$reverse(
                  A2($elm$core$List$range, 0, maxRank - 1)));
      });
  var $elm_community$list_extra$List$Extra$uncons = function (list) {
      if (!list.b) {
          return $elm$core$Maybe$Nothing;
      } else {
          var first = list.a;
          var rest = list.b;
          return $elm$core$Maybe$Just(
              _Utils_Tuple2(first, rest));
      }
  };
  var $elm_community$list_extra$List$Extra$swapAt = F3(
      function (index1, index2, l) {
          swapAt:
          while (true) {
              if (_Utils_eq(index1, index2) || (index1 < 0)) {
                  return l;
              } else {
                  if (_Utils_cmp(index1, index2) > 0) {
                      var $temp$index1 = index2,
                          $temp$index2 = index1,
                          $temp$l = l;
                      index1 = $temp$index1;
                      index2 = $temp$index2;
                      l = $temp$l;
                      continue swapAt;
                  } else {
                      var _v0 = A2($elm_community$list_extra$List$Extra$splitAt, index1, l);
                      var part1 = _v0.a;
                      var tail1 = _v0.b;
                      var _v1 = A2($elm_community$list_extra$List$Extra$splitAt, index2 - index1, tail1);
                      var head2 = _v1.a;
                      var tail2 = _v1.b;
                      var _v2 = _Utils_Tuple2(
                          $elm_community$list_extra$List$Extra$uncons(head2),
                          $elm_community$list_extra$List$Extra$uncons(tail2));
                      if ((_v2.a.$ === 'Just') && (_v2.b.$ === 'Just')) {
                          var _v3 = _v2.a.a;
                          var value1 = _v3.a;
                          var part2 = _v3.b;
                          var _v4 = _v2.b.a;
                          var value2 = _v4.a;
                          var part3 = _v4.b;
                          return $elm$core$List$concat(
                              _List_fromArray(
                                  [
                                      part1,
                                      A2($elm$core$List$cons, value2, part2),
                                      A2($elm$core$List$cons, value1, part3)
                                  ]));
                      } else {
                          return l;
                      }
                  }
              }
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Order$Transpose$optimizeNodePosition = F4(
      function (edges, _v0, i, _v1) {
          var prevLayer = _v0.a;
          var nextLayer = _v0.b;
          var curLayer = _v1.a;
          var improved = _v1.b;
          var oldLayers = _List_fromArray(
              [prevLayer, curLayer, nextLayer]);
          var newCurLayer = A3($elm_community$list_extra$List$Extra$swapAt, i, i + 1, curLayer);
          var newLayers = _List_fromArray(
              [prevLayer, newCurLayer, nextLayer]);
          return (_Utils_cmp(
              $goyalarchit$elm_dagre$Dagre$Order$CrossCount$crossCount(
                  _Utils_Tuple2(newLayers, edges)),
              $goyalarchit$elm_dagre$Dagre$Order$CrossCount$crossCount(
                  _Utils_Tuple2(oldLayers, edges))) < 0) ? _Utils_Tuple2(newCurLayer, true) : _Utils_Tuple2(curLayer, improved);
      });
  var $goyalarchit$elm_dagre$Dagre$Order$Transpose$optimizeLayer = F3(
      function (edges, rank, _v0) {
          var layering = _v0.a;
          var improved = _v0.b;
          var prevLayer = A2($goyalarchit$elm_dagre$Dagre$Utils$getLayer, rank - 1, layering);
          var nextLayer = A2($goyalarchit$elm_dagre$Dagre$Utils$getLayer, rank + 1, layering);
          var curLayer = A2($goyalarchit$elm_dagre$Dagre$Utils$getLayer, rank, layering);
          var positions = A2(
              $elm$core$List$range,
              0,
              $elm$core$List$length(curLayer) - 2);
          var _v1 = A3(
              $elm$core$List$foldl,
              A2(
                  $goyalarchit$elm_dagre$Dagre$Order$Transpose$optimizeNodePosition,
                  edges,
                  _Utils_Tuple2(prevLayer, nextLayer)),
              _Utils_Tuple2(curLayer, improved),
              positions);
          var newCurLayer = _v1.a;
          var newImproved = _v1.b;
          return _Utils_Tuple2(
              A3($elm_community$list_extra$List$Extra$setAt, rank, newCurLayer, layering),
              newImproved);
      });
  var $goyalarchit$elm_dagre$Dagre$Order$Transpose$optimizeViaTranspose = F2(
      function (edges, layering) {
          var maxRank = $elm$core$List$length(layering) - 1;
          var ranks = A2($elm$core$List$range, 0, maxRank);
          var _v0 = A3(
              $elm$core$List$foldl,
              $goyalarchit$elm_dagre$Dagre$Order$Transpose$optimizeLayer(edges),
              _Utils_Tuple2(layering, false),
              ranks);
          var newLayering = _v0.a;
          var improved = _v0.b;
          return _Utils_Tuple2(newLayering, improved);
      });
  var $goyalarchit$elm_dagre$Dagre$Order$Transpose$transpose = F2(
      function (edges, layering) {
          transpose:
          while (true) {
              var _v0 = A2($goyalarchit$elm_dagre$Dagre$Order$Transpose$optimizeViaTranspose, edges, layering);
              var newLayering = _v0.a;
              var improved = _v0.b;
              if (improved) {
                  var $temp$edges = edges,
                      $temp$layering = newLayering;
                  edges = $temp$edges;
                  layering = $temp$layering;
                  continue transpose;
              } else {
                  return layering;
              }
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Order$optimizeOrdering = F3(
      function (_v0, bestCC, _v1) {
          optimizeOrdering:
          while (true) {
              var layering = _v0.a;
              var edges = _v0.b;
              var iter = _v1.a;
              var lastBest = _v1.b;
              if (lastBest < 3) {
                  var newLayering = A2(
                      $goyalarchit$elm_dagre$Dagre$Order$sweepLayers,
                      _Utils_Tuple2(layering, edges),
                      iter);
                  var newTransposedLayering = A2($goyalarchit$elm_dagre$Dagre$Order$Transpose$transpose, edges, newLayering);
                  var newCC = $goyalarchit$elm_dagre$Dagre$Order$CrossCount$crossCount(
                      _Utils_Tuple2(newTransposedLayering, edges));
                  if (_Utils_cmp(newCC, bestCC) < 0) {
                      var $temp$_v0 = _Utils_Tuple2(newTransposedLayering, edges),
                          $temp$bestCC = newCC,
                          $temp$_v1 = _Utils_Tuple2(iter + 1, 0);
                      _v0 = $temp$_v0;
                      bestCC = $temp$bestCC;
                      _v1 = $temp$_v1;
                      continue optimizeOrdering;
                  } else {
                      var $temp$_v0 = _Utils_Tuple2(layering, edges),
                          $temp$bestCC = bestCC,
                          $temp$_v1 = _Utils_Tuple2(iter + 1, lastBest + 1);
                      _v0 = $temp$_v0;
                      bestCC = $temp$bestCC;
                      _v1 = $temp$_v1;
                      continue optimizeOrdering;
                  }
              } else {
                  return layering;
              }
          }
      });
  var $goyalarchit$elm_dagre$Dagre$Order$vertexOrder = function (_v0) {
      var layering = _v0.a;
      var edges = _v0.b;
      var initLayering = $goyalarchit$elm_dagre$Dagre$Order$Init$initOrder(layering);
      var bestCC = $goyalarchit$elm_dagre$Dagre$Order$CrossCount$crossCount(
          _Utils_Tuple2(initLayering, edges));
      return A3(
          $goyalarchit$elm_dagre$Dagre$Order$optimizeOrdering,
          _Utils_Tuple2(initLayering, edges),
          bestCC,
          _Utils_Tuple2(0, 0));
  };
  var $goyalarchit$elm_dagre$Dagre$runLayout = F2(
      function (edits, graph) {
          var config = A3(
              $elm$core$List$foldl,
              F2(
                  function (f, a) {
                      return f(a);
                  }),
              $goyalarchit$elm_dagre$Dagre$defaultConfig,
              edits);
          var _v0 = $goyalarchit$elm_dagre$Dagre$Acyclic$run(graph);
          var newGraph = _v0.a;
          var newAcyclicGraph = _v0.b;
          var reversedEdges = _v0.c;
          var rankList = $goyalarchit$elm_dagre$Dagre$Rank$assignRanks(newAcyclicGraph);
          var edges = $goyalarchit$elm_dagre$Dagre$Utils$getEdges(newGraph);
          var _v1 = $goyalarchit$elm_dagre$Dagre$Normalize$addDummyNodesAndSplitEdges(
              _Utils_Tuple2(rankList, edges));
          var _v2 = _v1.a;
          var newRankList = _v2.a;
          var newEdges = _v2.b;
          var controlPoints = _v1.b;
          var finalControlPoints = A3(
              $goyalarchit$elm_dagre$Dagre$Acyclic$undo,
              $goyalarchit$elm_dagre$Dagre$Utils$getEdges(graph),
              reversedEdges,
              controlPoints);
          var bestRankList = $goyalarchit$elm_dagre$Dagre$Order$vertexOrder(
              _Utils_Tuple2(newRankList, newEdges));
          var _v3 = A3(
              $goyalarchit$elm_dagre$Dagre$Position$position,
              config,
              newGraph,
              _Utils_Tuple2(bestRankList, newEdges));
          var finalDict = _v3.a;
          var _v4 = _v3.b;
          var w = _v4.a;
          var h = _v4.b;
          return {controlPtsDict: finalControlPoints, coordDict: finalDict, height: h, width: w};
      });
  var $elm_community$typed_svg$TypedSvg$svg = $elm_community$typed_svg$TypedSvg$Core$node('svg');
  var $goyalarchit$elm_dagre$Render$draw = F3(
      function (edits1, edits2, graph) {
          var drawConfig = A3(
              $elm$core$List$foldl,
              F2(
                  function (f, a) {
                      return f(a);
                  }),
              $goyalarchit$elm_dagre$Render$defDrawConfig,
              edits2);
          var dagreConfig = A3(
              $elm$core$List$foldl,
              F2(
                  function (f, a) {
                      return f(a);
                  }),
              $goyalarchit$elm_dagre$Dagre$defaultConfig,
              edits1);
          var _v0 = A2($goyalarchit$elm_dagre$Dagre$runLayout, edits1, graph);
          var width = _v0.width;
          var height = _v0.height;
          var coordDict = _v0.coordDict;
          var controlPtsDict = _v0.controlPtsDict;
          var edgesSvg = A2(
              $elm_community$typed_svg$TypedSvg$g,
              _List_fromArray(
                  [
                      $elm_community$typed_svg$TypedSvg$Attributes$class(
                      _List_fromArray(
                          ['links']))
                  ]),
              A2(
                  $elm$core$List$map,
                  function (e) {
                      return A5($goyalarchit$elm_dagre$Render$edgeDrawing, e, drawConfig.edgeDrawer, coordDict, controlPtsDict, dagreConfig);
                  },
                  $elm_community$graph$Graph$edges(graph)));
          var nodesSvg = A2(
              $elm_community$typed_svg$TypedSvg$g,
              _List_fromArray(
                  [
                      $elm_community$typed_svg$TypedSvg$Attributes$class(
                      _List_fromArray(
                          ['nodes']))
                  ]),
              A2(
                  $elm$core$List$map,
                  function (n) {
                      return A4($goyalarchit$elm_dagre$Render$nodeDrawing, n, drawConfig.nodeDrawer, coordDict, dagreConfig);
                  },
                  $elm_community$graph$Graph$nodes(graph)));
          return A2(
              $elm_community$typed_svg$TypedSvg$svg,
              _List_fromArray(
                  [
                      A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, width, height),
                      $elm_community$typed_svg$TypedSvg$Attributes$style(drawConfig.style)
                  ]),
              _List_fromArray(
                  [
                      A2(
                      $elm_community$typed_svg$TypedSvg$g,
                      _List_fromArray(
                          [
                              $elm_community$typed_svg$TypedSvg$Attributes$id(drawConfig.id)
                          ]),
                      _List_fromArray(
                          [edgesSvg, nodesSvg]))
                  ]));
      });
  var $goyalarchit$elm_dagre$Render$edgeDrawer = function (f) {
      return function (dc) {
          return _Utils_update(
              dc,
              {edgeDrawer: f});
      };
  };
  var $goyalarchit$elm_dagre$Render$nodeDrawer = function (f) {
      return function (dc) {
          return _Utils_update(
              dc,
              {nodeDrawer: f});
      };
  };
  var $goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$onClick = function (f) {
      return function (edc) {
          return _Utils_update(
              edc,
              {
                  onClick: $elm$core$Maybe$Just(f)
              });
      };
  };
  var $goyalarchit$elm_dagre$Dagre$Attributes$rankDir = function (rDir) {
      return function (a) {
          return _Utils_update(
              a,
              {rankDir: rDir});
      };
  };
  var $goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$strokeWidth = function (f) {
      return function (edc) {
          return _Utils_update(
              edc,
              {strokeWidth: f});
      };
  };
  var $goyalarchit$elm_dagre$Render$style = function (s) {
      return function (dc) {
          return _Utils_update(
              dc,
              {style: s});
      };
  };
  var $author$project$Main$viewGraph = function (g) {
      return A3(
          $goyalarchit$elm_dagre$Render$draw,
          _List_fromArray(
              [
                  $goyalarchit$elm_dagre$Dagre$Attributes$rankDir($goyalarchit$elm_dagre$Dagre$Attributes$LR)
              ]),
          _List_fromArray(
              [
                  $goyalarchit$elm_dagre$Render$nodeDrawer(
                  $goyalarchit$elm_dagre$Render$StandardDrawers$svgDrawNode(
                      _List_fromArray(
                          [
                              $goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$onClick(
                              function (n) {
                                  return $author$project$Main$SelectNode(n.id);
                              })
                          ]))),
                  $goyalarchit$elm_dagre$Render$edgeDrawer(
                  $goyalarchit$elm_dagre$Render$StandardDrawers$svgDrawEdge(
                      _List_fromArray(
                          [
                              $goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$arrowHead($goyalarchit$elm_dagre$Render$StandardDrawers$Types$Vee),
                              $goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$onClick(
                              function (e) {
                                  return $author$project$Main$SelectEdge(
                                      _Utils_Tuple2(e.from, e.to));
                              }),
                              $goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$strokeWidth(
                              function (_v0) {
                                  return 4;
                              })
                          ]))),
                  $goyalarchit$elm_dagre$Render$style('height: 80vh;')
              ]),
          g);
  };
  var $author$project$Main$view = function (model) {
      return A2(
          $elm$html$Html$div,
          _List_Nil,
          _List_fromArray(
              [
                  $author$project$Main$viewGraph($author$project$Main$simpleGraph),
                  A2(
                  $elm$html$Html$h1,
                  _List_Nil,
                  _List_fromArray(
                      [
                          $elm$html$Html$text(model)
                      ]))
              ]));
  };
  var $author$project$Main$main = $elm$browser$Browser$sandbox(
      {init: $author$project$Main$init, update: $author$project$Main$update, view: $author$project$Main$view});
  /*
  _Platform_export({'Main':{'init':$author$project$Main$main(
      $elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));
  */
  export const Elm = {'Main':{'init':$author$project$Main$main(
      $elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}};
    