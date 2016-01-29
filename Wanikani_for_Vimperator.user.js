// ==UserScript==
// @name        Wanikani for Vimperator
// @namespace   rr-@sakuya.pl
// @description Improves Wanikani navigation on Vimperator
// @include     https://www.wanikani.com/review/session
// @include     https://www.wanikani.com/lesson/session
// @version     1
// @grant       none
// ==/UserScript==

function convertLinks($targetItems, innerSelector)
{
    $targetItems.each(function(i, item)
    {
        var $item = $(item);

        // link already added?
        if ($item.find('a').length > 0)
            return;

        var $target = $item;
        if (typeof(innerSelector) !== 'undefined')
            $target = $target.find(innerSelector);

        $target.wrapInner(
            $('<a/>').click(function(e)
                {
                    $item.click();

                    // prevent firing event listeners that Wanikani might attach
                    // at later point in time
                    e.stopPropagation();
                    e.preventDefault();
                }));
    });
}

$(function()
{
    $('body').bind('DOMSubtreeModified', function()
    {
        // buttons under the main input
        convertLinks($('#additional-content li'), 'span');

        // top tabs
        convertLinks($('#supplement-nav li'));

        // bottom kanji buttons
        convertLinks($('#batch-items li'));

        // big left/right arrows
        convertLinks($('#prev-btn, #next-btn'));

        // summary links
        convertLinks($('#screen-quiz-ready li'));
        convertLinks($('#screen-lesson-ready li'));

        // add hidden text to arrows so that they're accessible with standard
        // names
        $('i.icon-chevron-right').each(function(i, item)
        {
            var $item = $(item);
            if ($item.find('span').length > 0)
                return;
            $item.wrapInner($('<span>Next</span>').hide());
        });
        $('i.icon-chevron-left').each(function(i, item)
        {
            var $item = $(item);
            if ($item.find('span').length > 0)
                return;
            $item.wrapInner($('<span>Previous</span>').hide());
        });
    });
});
