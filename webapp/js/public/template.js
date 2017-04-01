/*TMODJS:{"debug":true,"version":"1.0.0"}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^\/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^\/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define ? define(function() {
        return template;
    }) : "undefined" != typeof exports ? module.exports = template : this.template = template, 
    /*v:6*/
    template("page-tem", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), currentPage = $data.currentPage, $each = $utils.$each, pageArray = $data.pageArray, $escape = ($data.page, 
            $data.$index, $utils.$escape), totalPage = $data.totalPage, $out = "";
            return $out += ' <ul class="pagination"> <li ', $line = 4, 1 == currentPage && ($out += 'class="disabled"', 
            $line = 4), $out += '> <a onclick="prePage()">&laquo;</a> </li> ', $line = 7, $each(pageArray, function(page) {
                $out += " <li ", $line = 8, currentPage == page && ($out += 'class="active"', $line = 8), 
                $out += '> <a onclick="gotoPage(event)"> ', $line = 10, $out += $escape(page), $out += " </a> </li> ", 
                $line = 13;
            }), $out += " <li ", $line = 14, currentPage == totalPage && ($out += 'class="disabled"', 
            $line = 14), $out += '> <a onclick="nextPage()">&raquo;</a> </li> </ul> ', new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<!--页码控制模板-->\r\n\r\n<ul class="pagination">\r\n    <li {{if currentPage==1}}class="disabled"{{/if}}>\r\n    	<a onclick="prePage()">&laquo;</a>\r\n    </li>\r\n    {{each pageArray as page}}\r\n    <li {{if currentPage==page}}class="active"{{/if}}>\r\n    	<a onclick="gotoPage(event)">\r\n    		{{page}}\r\n    	</a>\r\n    </li>\r\n    {{/each}}\r\n    <li {{if currentPage==totalPage}}class="disabled"{{/if}}>\r\n    	<a onclick="nextPage()">&raquo;</a>\r\n    </li>\r\n</ul>\r\n'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    }), /*v:6*/
    template("table-tem", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $each = $utils.$each, students = $data.students, $escape = ($data.s, 
            $data.$index, $utils.$escape), $out = "";
            return $out += " <thead> <tr> <th>姓名</th> <th>年龄</th> <th>性别</th> <th>手机号</th> <th>邮箱</th> <th>修改</th> <th>删除</th> </tr> </thead> <tbody> ", 
            $line = 15, $each(students, function(s) {
                $out += " <tr> <td>", $line = 17, $out += $escape(s.name), $out += "</td> <td>", 
                $line = 18, $out += $escape(s.age), $out += "</td> <td>", $line = 19, $out += $escape(1 == s.gender ? "男" : "女"), 
                $out += "</td> <td>", $line = 20, $out += $escape(s.tel), $out += "</td> <td>", 
                $line = 21, $out += $escape(s.email), $out += '</td> <td> <span class="edit glyphicon glyphicon-edit"></span> </td> <td> <span stuid="', 
                $line = 26, $out += $escape(s.id), $out += '" class="delete glyphicon glyphicon-trash"></span> </td> </tr> ', 
                $line = 29;
            }), $out += " </tbody> ", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<!--表格模板-->\r\n<thead>\r\n	<tr>\r\n		<th>姓名</th>\r\n		<th>年龄</th>\r\n		<th>性别</th>\r\n		<th>手机号</th>\r\n		<th>邮箱</th>\r\n		<th>修改</th>\r\n		<th>删除</th>\r\n	</tr>\r\n</thead>\r\n\r\n<tbody>\r\n	{{each students as s}}\r\n	<tr>\r\n		<td>{{s.name}}</td>\r\n		<td>{{s.age}}</td>\r\n		<td>{{s.gender==1?"男":"女"}}</td>\r\n		<td>{{s.tel}}</td>\r\n		<td>{{s.email}}</td>\r\n		<td>\r\n			<span class="edit glyphicon glyphicon-edit"></span>\r\n		</td>\r\n		<td>\r\n			<span stuid="{{s.id}}" class="delete glyphicon glyphicon-trash"></span>\r\n		</td>\r\n	</tr>\r\n	{{/each}}\r\n</tbody>\r\n\r\n'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    });
}();