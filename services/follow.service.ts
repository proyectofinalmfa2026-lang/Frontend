import api from "@/lib/axios";

export interface FollowResponse {
  following: boolean;
  message: string;
}

interface FollowingRecord {
  following?: {
    id?: number;
  };
}

export const followService = {
  toggle: async (
    followerId: number,
    followingId: number,
  ): Promise<FollowResponse> => {
    const response = await api.post<FollowResponse>("/followers", {
      followerId,
      followingId,
    });

    return response.data;
  },

  check: async (
    followerId: number,
    targetUserId: number,
  ): Promise<boolean> => {
    const response = await api.get<FollowingRecord[]>(
      `/followers/user/following/${followerId}`,
    );

    return response.data.some(
      (record) => Number(record.following?.id) === targetUserId,
    );
  },
};
