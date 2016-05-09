Router.map(function(){
  this.route('home',{
    path:'/',
    template: 'home',
    layoutTemplate: 'layout',
    onBeforeAction: function(){
      var _id = Meteor.userId();
      this.subscribe('posts', _id);
      this.subscribe('friendship',_id);
      this.next();
    },
    data: function(){
      var _id = Meteor.userId();
      var timelineIds = Friendship.timelineIds(_id);
      return {
        posts: Post.find({}),
        followers: Friendship.followers(_id),
        followings: Friendship.followings(_id)
      }
    }
  });

  this.route('user', {
    path: '/user/:_id',
    template: 'user',
    layoutTemplate: 'layout',
    onBeforeAction: function(){
      var _id = this.params._id;
      var userId = Meteor.userId();
      this.subscribe('posts', _id);
      this.subscribe('friendship',_id);
      this.subscribe('isFollowing',_id);
      this.subscribe('user',_id);
      this.next();
    },
    data: function(){
      var _id = this.params._id;
      var isFollowing = Friendship.isFollowing(_id);
      Session.set('currentUserId',_id);
      Session.set('isFollowing', isFollowing);
      return {
        user: Meteor.users.findOne({_id:_id}),
        posts: Post.find({}),
        followers: Friendship.followers(_id),
        followings: Friendship.followings(_id)
      }
    }
  });
  this.route('follow',{
    path: '/user/:_id/follow',
    action: function(){
      var _id = this.params._id;
      Meteor.call('followUser', _id);
      this.redirect('/user/'+_id);
    }
  });
  this.route('unfollow',{
    path: 'user/:_id/unfollow',
    action: function(){
      var _id = this.params._id;
      Meteor.call('unfollowUser',_id);
      this.redirect('/user/'+_id);
    }
  });
});
