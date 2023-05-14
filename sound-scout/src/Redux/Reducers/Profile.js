import {
    FOLLOW_SUCCESS,
    FOLLOW_FAIL,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAIL,
    PERSONAL_PROFILE_SUCCESS,
    PERSONAL_PROFILE_FAIL,
    OTHER_PROFILE_SUCCESS,
    OTHER_PROFILE_FAIL,
    SET_PROFILE_SUCCESS,
    SENT_MESSAGE_SUCCESS,
    SENT_MESSAGE_FAIL,
    GET_CONVERSATIONS_SUCCESS,
    GET_CONVERSATION_SUCCESS,
    GET_CONVERSATIONS_FAIL,
    GET_CONVERSATION_FAIL
} from '../Types/Profile';

const initialState = {
    followers: [],
    following: [],
    topTracks: [],
    recentActivity: [],
    conversations: [],
    conversation: {},
    profilePic: '',
    likedTracks: [],
    otherFollowers: [],
    otherFollowing: [],
    otherTopTracks: [],
    otherRecentActivity: [],
    otherProfilePic: '',
    isFollowing: false
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FOLLOW_SUCCESS:
            return {
                ...state,
                followers: payload.profile.followers,
                following: payload.profile.following,
                otherFollowers: payload.otherProfile.followers,
                otherFollowing: payload.otherProfile.following,
                isFollowing: true
            }
        case UNFOLLOW_SUCCESS:
            return {
                ...state,
                followers: payload.profile.followers,
                following: payload.profile.following,
                otherFollowers: payload.otherProfile.followers,
                otherFollowing: payload.otherProfile.following,
                isFollowing: false
            }
        case PERSONAL_PROFILE_SUCCESS:
            return {
                ...state,
                followers: payload.profile.followers,
                following: payload.profile.following,
                profilePic: payload.profile.image_url,
                topTracks: payload.profile.top_tracks,
                recentActivity: payload.profile.recent_activity,
                conversations: payload.profile.conversations,
                likedTracks: payload.profile.liked_tracks,
                otherFollowers: payload.profile.followers,
                otherFollowing: payload.profile.following,
                otherProfilePic: payload.profile.image_url,
                otherTopTracks: payload.profile.top_tracks,
                otherRecentActivity: payload.profile.recent_activity
            }
        case OTHER_PROFILE_SUCCESS:
            return {
                ...state,
                otherFollowers: payload.profile.followers,
                otherFollowing: payload.profile.following,
                otherProfilePic: payload.profile.image_url,
                otherTopTracks: payload.profile.top_tracks,
                otherRecentActivity: payload.profile.recent_activity,
                isFollowing: payload.isFollowing
            }
        case SET_PROFILE_SUCCESS:
            return {
                ...state,
                conversation: payload
            }
        case SENT_MESSAGE_SUCCESS:
            return {
                ...state,
                conversation: payload.conversation
            }
        case GET_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                conversations: payload.conversations
            }
        case GET_CONVERSATION_SUCCESS:
            return {
                ...state,
                conversation: payload.conversation
            }
        case GET_CONVERSATIONS_FAIL:
        case GET_CONVERSATION_FAIL:
        case SENT_MESSAGE_FAIL:
        case PERSONAL_PROFILE_FAIL:
        case OTHER_PROFILE_FAIL:
        case FOLLOW_FAIL:
        case UNFOLLOW_FAIL:
        default:
            return state
    }
};
