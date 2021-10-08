var workbook = (function() {

    ////////////////////////////////////////////////////////////
    //   Page management
    ////////////////////////////////////////////////////////////

    function toggle_section(id, control) {
        if ($(id).is(':visible')) {
            $(id).hide();
            $(control).html('\u25b6');
        } else {
            $(id).show();
            $(control).html('\u25bc');
        }
    }

    function setup_handlers() {
        // exercises
        if (workbook.answers !== undefined) {
            workbook.answers.setup_answers();
        }
    }

    // let user change font size for content
    function change_font_size(direction) {
        var fsize = parseInt($('.content').css('font-size'));

        // increase/decrease font size
        if (direction == 'larger' && fsize < 30) fsize += 2;
        else if (direction == 'smaller' && fsize > 14) fsize -= 2;
        $('.content').css('font-size', fsize);

        // remember choice for next time
        localStorage.setItem('/ComputationStructures/font-size', $('.content').css('font-size'));
    }

    function setup_font() {
        var fsize = localStorage.getItem('/ComputationStructures/font-size');
        if (fsize != null) {
            $('.content').css('font-size', fsize);
        }
    }

    var answer_text_template = '\
        <div class="answer-row">\
        <label class="answer-label"></label>\
        <input type="text" class="answer-text-input"></input>\
        <div class="answer-check"></div>\
        </div>\
        <div class="answer-message"></div>';

    function setup_page() {
        setup_handlers(); // add onclick handlers to interface elements
        setup_font();
        notes_custom_tags_setup();
    }

    ////////////////////////////////////////////////////////////////////////
    // 1/7/16 SAW: Add some handlers for custom HTML tags.
    ////////////////////////////////////////////////////////////////////////

    function notes_custom_tags_setup() {
        $('inset').each(process_inset_tag);
    };

    // <inset> ...stuff... </inset>
    // Useful container for pictures, code snippets, live examples, etc
    // Encloses ...stuff... in a left- or right-adjusted inset, with
    //   text flowing around it.
    // Attributes:
    //   caption="Caption text"
    //   width=200px
    //   float=left (or right)
    // CSS classes used: inset, inset-caption, float-left, float-right

    function process_inset_tag(index, elt) {

        // Some defaults:
        var sfloat = 'right';
        var swidth = '200px';
        var click;

        if (elt.attributes.float) sfloat = elt.attributes.float.value;
        if (elt.attributes.width) swidth = elt.attributes.width.value;
        if (elt.attributes.click) click = elt.attributes.click.value;

        var newdiv = $('<div class="inset"></div>');
        newdiv.addClass('float-' + sfloat);
        newdiv.width(swidth);

        for (var cn = 0; cn < elt.children.length; cn++) {
            newdiv.append(elt.children[cn]);
        };

        // pngfile=filename adds an img elemeent, png file from notes/images:
        if (elt.attributes.pngfile) {
            var filename = elt.attributes.pngfile.value;
            if (!filename.endsWith('png')) filename += '.png';

            var tt = '<img src="../images/' + filename + '">';
            var imgelt = $(tt);

            // If we include an image, use width on enclosed image rather than
            // newdiv; otherwise, use it on newdiv:
            imgelt.width(swidth);
            swidth = 0; // To indicate its been used already.

            if (click) {
                imgelt = $('<a target="_blank"></a>').append(imgelt).attr('href', click);
            }

            newdiv.append(imgelt);
        }

        if (elt.attributes.caption) {
            var captiondiv = $('<div class="inset-caption"></div>');
            captiondiv.append(elt.attributes.caption.value);
            newdiv.append(captiondiv);
        };

        if (swidth != 0) newdiv.width(swidth);

        $(this).replaceWith(newdiv);
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// load and save saved answers
    ////////////////////////////////////////////////////////////////////////////////

    /**
     * Unicode to ASCII (encode data to Base64)
     * @param {string} data
     * @return {string}
     */
    function utoa(data) {
        return btoa(unescape(encodeURIComponent(data)));
    }

    function save_answers(a) {
        $(a).attr('href', 'data:text/plain;base64,' + utoa(JSON.stringify(localStorage)));
    }

    function load_answers(target) {
        var file = target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = JSON.parse(e.target.result);
            for (var tag in contents) {
                localStorage.setItem(tag, contents[tag]);
            }
            // reload page so it reflects newly loaded state
            location.reload();
        };
        reader.readAsText(file);
    }

    ////////////////////////////////////////////////////////////////////////////////
    /// Hide/show nav bar, to allow printing:
    ////////////////////////////////////////////////////////////////////////////////
    function hide_nav() {
        $('.navigation').hide();
        $('.printbutton').hide();
        $('.tab').hide();
        $('.content').each(function() {
            this.className = 'contentprint';
        });
    };

    ////////////////////////////////////////////////////////////
    //   Module exports
    ////////////////////////////////////////////////////////////

    return {
        toggle_section: toggle_section,
        change_font_size: change_font_size,
        setup_page: setup_page,
        hide_nav: hide_nav,
        save_answers: save_answers,
        load_answers: load_answers
    };

})();

// initialize user banner
$(document).ready(workbook.setup_page);