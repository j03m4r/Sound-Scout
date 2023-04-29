import {
    FOLLOW_SUCCESS,
    FOLLOW_FAIL,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAIL,
    PERSONAL_PROFILE_SUCCESS,
    PERSONAL_PROFILE_FAIL,
    OTHER_PROFILE_SUCCESS,
    OTHER_PROFILE_FAIL
} from '../Types/Profile';

const initialState = {
    followers: [],
    following: [],
    topTracks: [],
    profilePic: '',
    otherFollowers: [],
    otherFollowing: [],
    otherTopTracks: [],
    otherProfilePic: ''
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FOLLOW_SUCCESS:
            return {
                ...state,
                followers: payload.profile.followers,
                following: payload.profile.following,
                topTracks: payload.profile.top_tracks
            }
        case UNFOLLOW_SUCCESS:
            return {
                ...state,
                followers: payload.profile.followers,
                following: payload.profile.following,
            }
        case PERSONAL_PROFILE_SUCCESS:
            return {
                ...state,
                followers: payload.profile.followers,
                following: payload.profile.following,
                profilePic: payload.profile.image_url,
                topTracks: payload.profile.top_tracks,
                otherFollowers: payload.profile.followers,
                otherFollowing: payload.profile.following,
                otherProfilePic: payload.profile.image_url,
                otherTopTracks: payload.profile.top_tracks
            }
        case OTHER_PROFILE_SUCCESS:
            return {
                ...state,
                otherFollowers: payload.profile.followers,
                otherFollowing: payload.profile.following,
                otherProfilePic: payload.profile.image_url,
                otherTopTracks: payload.profile.top_tracks
            }
        case PERSONAL_PROFILE_FAIL:
        case OTHER_PROFILE_FAIL:
        case FOLLOW_FAIL:
        case UNFOLLOW_FAIL:
        default:
            return state
    }
};
