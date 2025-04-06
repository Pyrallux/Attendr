import BottomBar from "@/components/BottomBar/BottomBar";
import { groupsStyles } from "../styles/groupsStyles";
import {
  View,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getGroups, getUserDetail } from "@/api/api";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_layout";
import { Redirect, useRouter } from "expo-router";

interface Group {
  id: number;
  name: string;
  members: number[];
  admin: string;
}

export default function Groups() {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const { userId, setActiveGroupId } = useContext(AppContext);
  const router = useRouter();

  const { data: groupData } = useQuery({
    queryKey: ["groupList"],
    queryFn: () => getGroups(),
  });

  useEffect(() => {
    if (groupData) {
      setGroupList([
        ...groupData.filter((g: Group) => g.members.includes(userId)),
      ]);
    }
  }, [groupData]);

  const handleGroupClick = (id: number) => {
    setActiveGroupId(id);
    router.navigate("/groupleaderboard");
  };
  const handleEditGroupClick = (id: number) => {
    setActiveGroupId(id);
    router.navigate("/editgroup");
  };

  if (userId === -1) {
    return <Redirect href="/signin"></Redirect>;
  }
  return (
    <>
      <View style={groupsStyles.bg}>
        <View style={groupsStyles.bg}>
          <ScrollView>
            <View
              style={{
                paddingTop: 100,
                gap: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {groupList.map((g: Group, id) => {
                return (
                  <View key={id}>
                    <TouchableOpacity
                      onPress={() => {
                        handleGroupClick(g.id);
                      }}
                      style={{ marginTop: 15 }}
                    >
                      <ImageBackground
                        source={require("../assets/images/groupBG.png")} // replace with your actual path
                        style={{
                          width: 200,
                          height: 80,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        imageStyle={{ borderRadius: 10 }} // optional rounded corners
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 20,
                            fontFamily: "Jersey10",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {g.name}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleEditGroupClick(g.id);
                      }}
                      style={{
                        marginTop: 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          fontFamily: "Jersey10",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Edit Group
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
              <View style={{ paddingTop: 30 }}>
                <TouchableOpacity
                  onPress={() => {
                    router.navigate("/addgroup");
                  }}
                  style={{ marginTop: 20 }}
                >
                  <ImageBackground
                    source={require("../assets/images/groupsBorderAdd.png")} // replace with your actual path
                    style={{
                      width: 200,
                      height: 80,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    imageStyle={{ borderRadius: 10 }} // optional rounded corners
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontFamily: "Jersey10",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 35,
                      }}
                    >
                      Add New Group
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
                <View></View>
              </View>
            </View>
          </ScrollView>
        </View>
        <BottomBar></BottomBar>
      </View>
    </>
  );
}
