/*
Method invocation pattern
*/
'use strict';

var Main = (function($){
    var that = {};

    that.init = function() {
        that.prototypes();
        that.populateTable();
        that.initSidebarTabs();
        that.initModal();
    };

    that.prototypes = function() {
        // Example for custom prototypes
        Array.prototype.sortByKeyDesc = function(key) {
            return this.sort(function(a, b) {
                var x = a[key],
                    y = b[key];

                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        };
    };

    that.populateTable = function() {
        // Since only 1 table is used for data, selector is fine
        var rowTpl = '<tr>\
                <td>{name}</td>\
                <td>{apy} %</td>\
                <td>${earnings}</td>\
            </tr>';
            // Could use string interpolation template literals such as `<td>${expression}</td>` in ES6

        var $xhr = $.ajax({
            url: 'data/code-test.json',
            method: 'GET',
            beforeSend: function(xhr) {
                // Show loading
            }
        }).done(function(data){
            var rows = '';

            data = data.sortByKeyDesc('apy');

            $.each(data, function(idx, obj) {
                var row = rowTpl;
                for (var prop in obj) {
                    var re = new RegExp('{' + prop + '}', 'g'),
                        val = obj[prop];

                    val = $.isNumeric(val) ? val.toFixed(2) : val;
                    row = row.replace(re, val);
                }
                rows += row;
            });
            $('table tbody').html(rows);
        }).fail(function(){
            // Should do something here
        }).always(function(){
            // Would hide loader
        });
    };

    that.initSidebarTabs = function() {
        $(document).on('click.tabs', '.tabs ul li a', function(e){
            e.preventDefault(); // #'s make it jump to the top

            var $this = $(this),
                $container = $this.closest('.tabs'),
                $ul = $container.find('ul'),
                $li = $this.closest('li'),
                $lis = $ul.find('li'),
                $tabGroups = $container.find('.tab-group'),
                target = $this.data('tab-target');

            $lis.removeClass('active');
            $li.addClass('active');
            $tabGroups.removeClass('active');
            $container.find(target).addClass('active');
        });
    };

    that.initModal = function() {
        $(document).on('click.modal', '[data-modal-target]', function(e){
            e.preventDefault();

            var $this = $(this),
                target = $this.data('modal-target');

            $(target).fadeIn();
        });
        $(document).on('click.modalClose', '.modal-close', function(e){
            e.preventDefault();
            $(this).closest('.modal').fadeOut();
        });
    };

    return that;

})(jQuery); // jquery global as mixin, if in noconflict mode etc.

// wait for doc load
jQuery(function(){
    Main.init();
});
