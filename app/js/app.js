(function($){
'use strict';

    var UserModel = Backbone.Model.extend({
        defaults: {
            first_name: '',
            last_name: ''
        }
    });
    var UserCollection = Backbone.Collection.extend({
        model: UserModel,
        url: BACKEND_API + '/users',
        parse: function(response){
            console.log('Got resp: '); console.log(response);
            return response.data;
        }
    });
    var UserView = Backbone.View.extend({
        tagName: 'div',
        className: 'user-data-container',
        template: _.template($('#octus-template').html()),
        initialize: function() {
            console.log('Initialised with: '); console.log(this.model);
        },
        render: function() {
            var html = this.template(this.model.toJSON());
            this.$el.html(html);
            return this;
        }
    });
    var UserCollectionView = Backbone.View.extend({
        el: '#octus-users',
        initialize: function() {
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },
        render: function() {
            var that = this;
            var $list = this.$('ul.octus-user-list').empty();
            _.each(this.collection.models, function(user){
                that.renderUser(user);
            }, this);
            return this;
        },
        renderUser: function(user) {
            console.log('Rendering user: '); console.log(user);
            var userView = new UserView({
                model: user
            });
            this.$el.append(userView.render().el);
        }
    });
    var userList = new UserCollection();
    var userListView = new UserCollectionView({collection: userList});
})(jQuery);