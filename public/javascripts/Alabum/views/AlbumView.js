define(function(require, exports, module) {
    var Surface              = require('famous/core/Surface');
    var Modifier             = require('famous/core/Modifier');
    var Transform            = require('famous/core/Transform');
    var View                 = require('famous/core/View');
    var ScrollView           = require('famous/views/Scrollview');
    var SequentialLayout     = require("famous/views/SequentialLayout");
    var Transitionable       = require('famous/transitions/Transitionable');
    var GenericSync          = require('famous/inputs/GenericSync');

    var ScrollViewExtension  = require('alabum/views/ScrollViewExtension');
    var RowView              = require('alabum/views/RowView');
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
            ['images/DDD/7.jpg','images/DDD/8.jpg','images/DDD/9.jpg'],
            ['images/DDD/10.jpg','images/DDD/11.jpg','images/DDD/12.jpg'],
            ['images/DDD/13.jpg','images/DDD/14.jpg','images/DDD/15.jpg'],
            ['images/DDD/16.jpg','images/DDD/17.jpg','images/DDD/18.jpg'],
            ['images/DDD/19.jpg','images/DDD/20.jpg','images/DDD/21.jpg'],
            ['images/DDD/22.jpg','images/DDD/23.jpg','images/DDD/24.jpg'],
            ['images/DDD/25.jpg','images/DDD/26.jpg','images/DDD/27.jpg'],
            ['images/DDD/1.jpg','images/DDD/2.jpg','images/DDD/3.jpg'],
            ['images/DDD/4.jpg','images/DDD/5.jpg','images/DDD/6.jpg'],
            ['images/DDD/7.jpg','images/DDD/8.jpg','images/DDD/9.jpg'],
            ['images/DDD/10.jpg','images/DDD/11.jpg','images/DDD/12.jpg'],
            ['images/DDD/13.jpg','images/DDD/14.jpg','images/DDD/15.jpg'],
            ['images/DDD/16.jpg','images/DDD/17.jpg','images/DDD/18.jpg'],
            ['images/DDD/19.jpg','images/DDD/20.jpg','images/DDD/21.jpg'],
            ['images/DDD/22.jpg','images/DDD/23.jpg','images/DDD/24.jpg'],
            ['images/DDD/25.jpg','images/DDD/26.jpg','images/DDD/27.jpg'],
            ['images/DDD/1.jpg','images/DDD/2.jpg','images/DDD/3.jpg'],
            ['images/DDD/4.jpg','images/DDD/5.jpg','images/DDD/6.jpg'],
            ['images/DDD/7.jpg','images/DDD/8.jpg','images/DDD/9.jpg'],
            ['images/DDD/10.jpg','images/DDD/11.jpg','images/DDD/12.jpg'],
            ['images/DDD/13.jpg','images/DDD/14.jpg','images/DDD/15.jpg'],
            ['images/DDD/16.jpg','images/DDD/17.jpg','images/DDD/18.jpg'],
            ['images/DDD/19.jpg','images/DDD/20.jpg','images/DDD/21.jpg'],
            ['images/DDD/22.jpg','images/DDD/23.jpg','images/DDD/24.jpg'],
            ['images/DDD/25.jpg','images/DDD/26.jpg','images/DDD/27.jpg']
        ];

    function getAlbumIcons(row) {
        return albumIcons[row];
    }


    module.exports = AlbumView;
});