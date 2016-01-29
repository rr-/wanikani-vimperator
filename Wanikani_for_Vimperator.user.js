// ==UserScript==
// @name        Wanikani for Vimperator
// @namespace   rr-@sakuya.pl
// @description Improves Wanikani navigation on Vimperator
// @include     https://www.wanikani.com/review/session
// @version     1
// @grant       none
// ==/UserScript==

function convertLinksInReviews()
{
    $('#additional-content li').each(function(i, $li)
    {
        var eventHandler = $._data($li, 'events')[0];
        var $a = $('<a/>').click(eventHandler);
        $('span', $li).wrapInner($a);
    });
}

$(function()
{
    convertLinksInReviews();
});
