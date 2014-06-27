define(function(require, exports, module) {
    var Surface              = require('famous/core/Surface');
    var Modifier             = require('famous/core/Modifier');
    var Transform            = require('famous/core/Transform');
    var View                 = require('famous/core/View');
    var ScrollView           = require('famous/views/Scrollview');
    var SequentialLayout     = require("famous/views/SequentialLayout");
    var Transitionable       = require('famous/transitions/Transitionable');
    var GenericSync          = require('famous/inputs/GenericSync');

    var ScrollViewExtension  = require('Alabum/views/ScrollViewExtension');
    var RowView              = require('Alabum/views/RowView');
    var ContainerSurface     = require("famous/surfaces/ContainerSurface");

    function AlbumView() {
        View.apply(this, arguments);

        this.bottomIconsDisplayed = true;
        this.touched = false; //keeps track of whether scroll view is touched
        _createContent.call(this);
    }

    AlbumView.prototype = Object.create(View.prototype);
    AlbumView.prototype.constructor = AlbumView;

    AlbumView.prototype.render =  function() {
        if (!this.scrollView.getVelocity() && !this.bottomIconsDisplayed && !this.touched) { //scroll view stopped
            this.bottomIconsDisplayed = true;
            this._eventOutput.emit('displayBottomIcons');
        }
        return this._node.render.apply(this._node, arguments);
    };

    AlbumView.DEFAULT_OPTIONS = {
        height: null,
        width: null,
        albumSize: null
    };

    function _createContent() {
        this.scrollView = new ScrollViewExtension({
            margin: 100000000
        });

        this.scrollView.on('start', function() {
            this._eventOutput.emit('hideBottomIcons');
            this.bottomIconsDisplayed = false;
            this.touched = true;
        }.bind(this));

        this.scrollView.on('end', function() {
            this.touched = false;
        }.bind(this));

        var views = [];
        this.scrollView.sequenceFrom(views);

        var rowView;
        this.rowViews = []; //maintain reference to rowViews for animation 
        var count = 0;
        for(var row = 0; row < albumIcons.length; row++) {
            // seqView = _createRow.call(this);
            rowView = new RowView({
                albumSize: this.options.albumSize,
                scrollView: this.scrollView,
                count: count,
                albumIcons: getAlbumIcons(row)
            });
            this.rowViews.push(rowView);

            views.push(rowView.sequentialLayout);
            count += 3;
        }

        //Create a container for the scroll view
        this.container = new ContainerSurface({
            classes: ['albumScrollContainer'],
            size: [this.options.width, this.options.height],
            properties:{
                overflow: 'hidden'
            }
        });
        this.container.add(this.scrollView);
        this._add(this.container);
    }

    var albumIcons = [
            ['images/DDD/1.jpg','images/DDD/2.jpg','images/DDD/3.jpg'],
            ['images/DDD/4.jpg','images/DDD/5.jpg','images/DDD/6.jpg'],
            ['images/DDD/7.JPG','images/DDD/8.JPG','images/DDD/9.JPG'],
            ['images/DDD/10.JPG','images/DDD/11.JPG','images/DDD/12.JPG'],
            ['images/DDD/13.JPG','images/DDD/14.JPG','images/DDD/15.JPG'],
            ['images/DDD/16.JPG','images/DDD/17.JPG','images/DDD/18.JPG'],
            ['images/DDD/19.JPG','images/DDD/20.JPG','images/DDD/21.JPG'],
            ['images/DDD/22.JPG','images/DDD/23.JPG','images/DDD/24.JPG'],
            ['images/DDD/25.JPG','images/DDD/26.JPG','images/DDD/27.JPG'],
        ['images/DDD/1.jpg','images/DDD/2.jpg','images/DDD/3.jpg'],
        ['images/DDD/4.jpg','images/DDD/5.jpg','images/DDD/6.jpg'],
        ['images/DDD/7.JPG','images/DDD/8.JPG','images/DDD/9.JPG'],
        ['images/DDD/10.JPG','images/DDD/11.JPG','images/DDD/12.JPG'],
        ['images/DDD/13.JPG','images/DDD/14.JPG','images/DDD/15.JPG'],
        ['images/DDD/16.JPG','images/DDD/17.JPG','images/DDD/18.JPG'],
        ['images/DDD/19.JPG','images/DDD/20.JPG','images/DDD/21.JPG'],
        ['images/DDD/22.JPG','images/DDD/23.JPG','images/DDD/24.JPG'],
        ['images/DDD/25.JPG','images/DDD/26.JPG','images/DDD/27.JPG'],
        ['images/DDD/1.jpg','images/DDD/2.jpg','images/DDD/3.jpg'],
        ['images/DDD/4.jpg','images/DDD/5.jpg','images/DDD/6.jpg'],
        ['images/DDD/7.JPG','images/DDD/8.JPG','images/DDD/9.JPG'],
        ['images/DDD/10.JPG','images/DDD/11.JPG','images/DDD/12.JPG'],
        ['images/DDD/13.JPG','images/DDD/14.JPG','images/DDD/15.JPG'],
        ['images/DDD/16.JPG','images/DDD/17.JPG','images/DDD/18.JPG'],
        ['images/DDD/19.JPG','images/DDD/20.JPG','images/DDD/21.JPG'],
        ['images/DDD/22.JPG','images/DDD/23.JPG','images/DDD/24.JPG'],
        ['images/DDD/25.JPG','images/DDD/26.JPG','images/DDD/27.JPG'],
        ['images/DDD/1.jpg','images/DDD/2.jpg','images/DDD/3.jpg'],
        ['images/DDD/4.jpg','images/DDD/5.jpg','images/DDD/6.jpg'],
        ['images/DDD/7.JPG','images/DDD/8.JPG','images/DDD/9.JPG'],
        ['images/DDD/10.JPG','images/DDD/11.JPG','images/DDD/12.JPG'],
        ['images/DDD/13.JPG','images/DDD/14.JPG','images/DDD/15.JPG'],
        ['images/DDD/16.JPG','images/DDD/17.JPG','images/DDD/18.JPG'],
        ['images/DDD/19.JPG','images/DDD/20.JPG','images/DDD/21.JPG'],
        ['images/DDD/22.JPG','images/DDD/23.JPG','images/DDD/24.JPG'],
        ['images/DDD/25.JPG','images/DDD/26.JPG','images/DDD/27.JPG'],
        ['images/DDD/1.jpg','images/DDD/2.jpg','images/DDD/3.jpg'],
        ['images/DDD/4.jpg','images/DDD/5.jpg','images/DDD/6.jpg'],
        ['images/DDD/7.JPG','images/DDD/8.JPG','images/DDD/9.JPG'],
        ['images/DDD/10.JPG','images/DDD/11.JPG','images/DDD/12.JPG'],
        ['images/DDD/13.JPG','images/DDD/14.JPG','images/DDD/15.JPG'],
        ['images/DDD/16.JPG','images/DDD/17.JPG','images/DDD/18.JPG'],
        ['images/DDD/19.JPG','images/DDD/20.JPG','images/DDD/21.JPG'],
        ['images/DDD/22.JPG','images/DDD/23.JPG','images/DDD/24.JPG'],
        ['images/DDD/25.JPG','images/DDD/26.JPG','images/DDD/27.JPG'],
        ];

    function getAlbumIcons(row) {
        return albumIcons[row];
    }


    module.exports = AlbumView;
});