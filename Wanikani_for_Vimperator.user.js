// ==UserScript==
// @name        Wanikani for Vimperator
// @namespace   rr-@sakuya.pl
// @description Improves Wanikani navigation on Vimperator
// @include     https://www.wanikani.com/review/session
// @include     https://www.wanikani.com/lesson/session
// @version     1
// @grant       none
// ==/UserScript==

function convertLinksInReviews()
{
    // buttons under the main input
    $('#additional-content li').each(function(i, li)
    {
        var $li = $(li);
        $('span', $li).wrapInner($('<a/>').click(function() { $li.click(); }));
    });
}

function convertLinksInLessons()
{
    // top tabs
    $('#supplement-nav').bind('DOMSubtreeModified', function()
    {
        $('#supplement-nav li').each(function(i, li)
        {
            var $li = $(li);
            // link already added?
            if ($li.find('a').length > 0)
                return;
            $li.wrapInner($('<a/>').click(function() { $li.click(); }));
        });
    });
}

$(function()
{
    convertLinksInReviews();
    convertLinksInLessons();
});
