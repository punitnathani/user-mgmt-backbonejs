(function($){
'use strict';

    var userToEdit = {};
    var UserModel = Backbone.Model.extend({
        urlRoot: BACKEND_API + '/users',
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
        events: {
            'click .remove': 'onRemove',
            'click .edit': 'onEdit'
        },
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            var html = this.template(this.model.toJSON());
            this.$el.html(html);
            return this;
        },
        onRemove: function() {
            if(confirm("Are you sure you want to delete this user?")) {
                verifyAndRemoveUser(this);
            }
        },
        onEdit: function() {
            editUser(this);
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
            $('#octus-users').empty();
            _.each(this.collection.models, function(user){
                that.renderUser(user);
            }, this);
            return this;
        },
        renderUser: function(user) {
            var userView = new UserView({
                model: user
            });
            this.$el.append(userView.render().el);
        },
        onCreate: function(user) {
            this.collection.create({
                first_name: user.first_name,
                last_name: user.last_name
            });
        }
    });
    var userList = new UserCollection();
    var userListView = new UserCollectionView({collection: userList});

    /* Modal */
    var Modal = Backbone.Modal.extend({
        template: '#octus-user-modal-template',
        submitEl: '#user-data-save',
        cancelEl: '#user-data-cancel',
        onShow: function() {
            console.log('showing');
            console.log(userToEdit);
            if(!_.isEmpty(userToEdit)) {
                setTimeout(() => {
                    $('#first_name').val(userToEdit.first_name);
                    $('#last_name').val(userToEdit.last_name);
                }, 300);
            }
        },
        beforeSubmit: function() {
            var $firstName = $('#first_name'), $lastName = $('#last_name');
            $firstName.removeClass('user-input-error');
            $lastName.removeClass('user-input-error');

            if($firstName.val() === '' || $lastName.val() === '') {
                if($firstName.val() === '') {
                    $firstName.addClass('user-input-error');
                }
                if($lastName.val() === '') {
                    $lastName.addClass('user-input-error');
                }
                return false;
            }
            if(_.isEmpty(userToEdit)) {
                userListView.onCreate({
                    first_name: $firstName.val(),
                    last_name: $lastName.val()
                });
            }
            else {
                var user = userListView.collection.get(userToEdit.id);
                user.set({
                    first_name: $firstName.val(),
                    last_name: $lastName.val()
                });
                user.save();
                userToEdit = {};
            }
            return true;
        },
        cancel: function () {
            userToEdit = {};
        }
    });
    $('#user-data-add').on('click', function(){
        var modalView = new Modal();
        $('#octus-user-modal').html(modalView.render().el);
    });

    /* Modal for error on last delete */
    var LastItemModal = Backbone.Modal.extend({
        template: '#octus-delete-last',
        cancelEl: '.bbm-button'
    });

    var verifyAndRemoveUser = function(context) {
        if(userListView.collection.length > 1) {
            context.model.destroy();
        }
        else {
            var errorModal = new LastItemModal();
            $('#octus-user-modal').html(errorModal.render().el);
        }
    }

    /* Edit user */
    var editUser = function(context) {
        userToEdit = context.model.attributes;
        var editModal = new Modal();
        $('#octus-user-modal').html(editModal.render().el);
    }
})(jQuery);