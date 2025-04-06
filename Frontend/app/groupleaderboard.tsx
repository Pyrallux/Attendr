import BottomBar from "@/components/BottomBar/BottomBar";
import { groupsStyles } from "../styles/groupsStyles";
import { View, Button } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getGroupDetail, getGroups, getUserDetail } from "@/api/api";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_layout";
import { Redirect, useRouter } from "expo-router";
import { addScheduleStyles } from "../styles/addScheduleStyles";

interface Member {
  user_id: number;
  username: string;
  score: number;
}

export default function GroupLeaderboard() {
  const [memberList, setMemberList] = useState<Member[]>([]);
  const { userId, activeGroupId } = useContext(AppContext);
  const router = useRouter();

  const { data: groupData } = useQuery({
    queryKey: ["groupList"],
    queryFn: () => getGroupDetail(activeGroupId),
  });
  const { mutateAsync: getUserDetailMutation } = useMutation({
    mutationFn: (id: number) => getUserDetail(id),
    onSuccess: (data) => {
      let member_list: Member[] = memberList;
      member_list.push({
        user_id: data.user_id,
        username: data.username,
        score: data.score,
      });
      setMemberList([...member_list]);
    },
  });

  useEffect(() => {
    if (groupData) {
      let member_list: Member[] = [];
      for (let i = 0; i < groupData.members.length; i++) {
        getUserDetailMutation(groupData[i]);
      }
    }
  }, [groupData]);

  if (userId === -1) {
    return <Redirect href="/signin"></Redirect>;
  }
  return (
    <>
      <View style={groupsStyles.bg}>
        {/* {memberList.map((m: Member, i: number) => {
        <View key={i}>
          <Text>#{i}</Text>
       <Text>{m.username}</Text>
       <Text>{m.score}</Text>
       </View>}} */}
        // Textinput with a button
        <BottomBar></BottomBar>
      </View>
    </>
  );
}
