! function(a, b) {
    var c, d, e = a.config.menuSettings,
        f = Function.prototype.bind ? function(a, b) {
            return a.bind(b)
        } : function(a, b) {
            return function() {
                a.apply(b, arguments)
            }
        },
        g = Object.keys || function(a) {
            var b = [];
            for (var c in a) a.hasOwnProperty(c) && b.push(c);
            return b
        },
        h = MathJax.Ajax.config.path;
    h.a11y || (h.a11y = h.Contrib ? h.Contrib + "/a11y" : (String(location.protocol).match(/^https?:/) ? "" : "http:") + "//cdn.mathjax.org/mathjax/contrib/a11y");
    var i = b["accessibility-menu"] = {
            version: "1.1",
            prefix: "",
            default: {},
            modules: [],
            MakeOption: function(a) {
                return i.prefix + a
            },
            GetOption: function(a) {
                return e[i.MakeOption(a)]
            },
            AddDefaults: function() {
                for (var a, b = g(i.default), c = 0; a = b[c]; c++) {
                    var d = i.MakeOption(a);
                    "undefined" == typeof e[d] && (e[d] = i.default[a])
                }
            },
            AddMenu: function() {
                for (var a, b = Array(this.modules.length), e = 0; a = this.modules[e]; e++) b[e] = a.placeHolder;
                var f = d.FindId("Accessibility");
                if (f) b.unshift(c.RULE()), f.submenu.items.push.apply(f.submenu.items, b);
                else {
                    var g = (d.FindId("Settings", "Renderer") || {}).submenu;
                    g && (b.unshift(c.RULE()), b.unshift(g.items.pop()), b.unshift(g.items.pop())), b.unshift("Accessibility");
                    var f = c.SUBMENU.apply(c.SUBMENU, b),
                        h = d.IndexOfId("Locale");
                    h ? d.items.splice(h, 0, f) : d.items.push(c.RULE(), f)
                }
            },
            Register: function(a) {
                i.default[a.option] = !1, i.modules.push(a)
            },
            Startup: function() {
                c = MathJax.Menu.ITEM, d = MathJax.Menu.menu;
                for (var a, b = 0; a = this.modules[b]; b++) a.CreateMenu();
                this.AddMenu()
            },
            LoadExtensions: function() {
                for (var b = [], c = 0; module = this.modules[c]; c++) e[module.option] && b.push(module.module);
                return b.length ? a.Startup.loadArray(b) : null
            }
        },
        j = MathJax.Extension.ModuleLoader = MathJax.Object.Subclass({
            option: "",
            name: ["", ""],
            module: "",
            placeHolder: null,
            submenu: !1,
            extension: null,
            Init: function(a, b, c, d, e) {
                this.option = a, this.name = [b.replace(/ /g, ""), b], this.module = c, this.extension = d, this.submenu = e || !1
            },
            CreateMenu: function() {
                var a = f(this.Load, this);
                this.submenu ? this.placeHolder = c.SUBMENU(this.name, c.CHECKBOX(["Activate", "Activate"], i.MakeOption(this.option), {
                    action: a
                }), c.RULE(), c.COMMAND(["OptionsWhenActive", "(Options when Active)"], null, {
                    disabled: !0
                })) : this.placeHolder = c.CHECKBOX(this.name, i.MakeOption(this.option), {
                    action: a
                })
            },
            Load: function() {
                a.Queue(["Require", MathJax.Ajax, this.module, ["Enable", this]])
            },
            Enable: function(a) {
                var b = MathJax.Extension[this.extension];
                b && (b.Enable(!0, !0), MathJax.Menu.saveCookie())
            }
        });
    i.Register(j("collapsible", "Collapsible Math", "[a11y]/collapsible.js", "collapsible")), i.Register(j("autocollapse", "Auto Collapse", "[a11y]/auto-collapse.js", "auto-collapse")), i.Register(j("explorer", "Explorer", "[a11y]/explorer.js", "explorer", !0)), i.AddDefaults(), a.Register.StartupHook("End Extensions", function() {
        a.Register.StartupHook("MathMenu Ready", function() {
            i.Startup(), a.Startup.signal.Post("Accessibility Menu Ready")
        }, 5)
    }, 5), MathJax.Callback.Queue(["LoadExtensions", i], ["loadComplete", MathJax.Ajax, "[a11y]/accessibility-menu.js"])
}(MathJax.Hub, MathJax.Extension);