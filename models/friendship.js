Friendship = new Meteor.Collection('friendships');
Friendship.follow = function(friendId){
  this.insert({
    userId: Meteor.userId(),
    friendId: friendId
  });
};
Friendship.unfollow = function(friendId){
  this.remove({
    userId: Meteor.userId(),
    friendId: friendId
  });
};

Friendship.isFollowing = function(friendId){
  return this.findOne({
    userId: Meteor.userId(),
    friendId: friendId
  });
};
Friendship.followers = function(friendId){
  var followers = this.find({friendId:friendId}).count();
  return followers;
};
Friendship.followings = function(userId){
  var followings = this.find({userId: userId}).count();
  return followings;
};
Friendship.timelineIds = function(userId){
  var timelineIds = this.find({
    userId: userId
  }).map(function(f){
    return f.friendId;
  });
  timelineIds.push(userId);
  return timelineIds;
};
Friendship.followersAndFollowings = function(_id){
  return this.find({$or: [{userId: _id},{friendId: _id}]});
}
