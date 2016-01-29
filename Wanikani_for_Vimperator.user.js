// ==UserScript==
// @name        Wanikani for Vimperator
// @namespace   rr-@sakuya.pl
// @description Improves Wanikani navigation on Vimperator
// @include     https://www.wanikani.com/review/session
// @include     https://www.wanikani.com/lesson/session
// @version     1
// @grant       none
// ==/UserScript==

function convertLinks($targetItems)
{
    $targetItems.each(function(i, item)
    {
        var $item = $(item);

        // link already added?
        if ($item.find('a').length > 0)
            return;

        $item.wrapInner(
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

function convertLinksInReviews()
{
    // buttons under the main input
    convertLinks($('#additional-content li'));
}

function convertLinksInLessons()
{
    $('#lesson').bind('DOMSubtreeModified', function()
    {
        // top tabs
        convertLinks($('#supplement-nav li'));

        // bottom kanji buttons
        convertLinks($('#batch-items li'));

        // big left/right arrows
        convertLinks($('#prev-btn, #next-btn'));
    });
}

$(function()
{
    convertLinksInReviews();
    convertLinksInLessons();
});
