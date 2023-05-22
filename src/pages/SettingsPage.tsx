import { Box, Flex, Text } from "@chakra-ui/react";
import { Slide } from "../util/entrance-animation";
import { useSelector } from "react-redux";
import { SettingState, useSettingActions } from "../util/redux/settingSlice";
import { useNavigate } from "react-router-dom";

const SettingItem = ({
  name,
  condition,
  action,
}: {
  name: string;
  condition: string;
  action: () => void;
}) => {
  return (
    <Flex w="100%" justifyContent="space-between" mt="1em">
      <Text color="white" fontSize="1.3em">{name}</Text>
      <Flex
        w="5em"
        alignItems="center"
        justifyContent="center"
        bg="white"
        cursor="pointer"
        _hover={{ bg: "btnHover" }}
        onClick={action}
      >
        <Text color="btnColor.1">{condition}</Text>
      </Flex>
    </Flex>
  );
};

/* list of settings 
    timerVoiceNotification: boolean,
    timerRingtone: boolean,
    timerVibration: boolean,
    runningSequenceID: number,
    runningSequenceList: RunningSequence[],

*/

export const SettingsPage = () => {
  const {setting: settings} = useSelector((state: any) => state);
  const settingActions = useSettingActions()
  const nav = useNavigate()

  return (
    <Slide from="bottom">
      <Box bg="block" w="100vw">
        <Flex w="min(30em,90%)" h="100vh" flexDir="column" mx="auto">
          <SettingItem name="Timer Voice Notification :" condition={settings.timerVoiceNotification ? "On" : "Off"} action={() => {
            settingActions.toggleTimerVoiceNotification()            
          }} />
          <SettingItem name="Timer Ringtone :" condition={settings.timerRingtone ? "On" : "Off"} action={() => {
            settingActions.toggleTimerRingtone()            
          }} />
          <SettingItem name="Timer Vibration :" condition={settings.timerVibration ? "On" : "Off"} action={() => {
            settingActions.toggleTimerVibration()            
          }} />
          <SettingItem name="Sequences" condition={"Edit"} action={() => {
            nav("/editor")
          }} />
        </Flex>
      </Box>
    </Slide>
  );
};
