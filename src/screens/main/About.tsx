import { StyleSheet } from "react-native";
import React from "react";
import { Box, Text } from "native-base";
import Header from "../../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";

type Props = {} & NativeStackScreenProps<RootStackParams, "About">;

const About = (props: Props) => {
  const { navigation } = props;
  const handleBtnBack = () => {
    navigation.goBack();
  };
  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader title="Về chúng tôi" handleBtnBack={handleBtnBack} />
      <Box px={6} py={4}>
        <Text fontWeight={400} fontSize={14} color={'muted.800'}>
          Lorem ipsum dolor sit amet consectetur. Sed convallis urna et etiam
          scelerisque sit scelerisque viverra nec. Donec tincidunt morbi non
          volutpat vel in. Ornare aenean enim tempor lectus eget. Lorem integer
          etiam et adipiscing. Vel consectetur massa fringilla porttitor viverra
          diam morbi tortor. Eget non rhoncus et laoreet et lectus lacus ipsum.
          Enim vitae morbi placerat consequat nunc etiam euismod auctor
          faucibus. Urna aliquet lacus at commodo ligula amet. Convallis
          tincidunt pellentesque vestibulum aliquam vestibulum egestas. Tortor
          in sed a in pellentesque pulvinar. Elit et ut fusce suspendisse mattis
          nullam donec donec lacinia. Eros nulla at dapibus amet morbi. Tellus
          dui in nunc sit sed sed diam odio. Amet tincidunt ac habitasse velit
          elementum. In scelerisque sit sed orci sed sit nunc luctus. Amet
          volutpat diam lectus erat id diam. Quis risus tristique velit semper
          diam. Morbi sed vivamus tristique nulla pretium est sit pellentesque
          duis. Neque ut dis eget tellus urna malesuada ac. Sed volutpat
          elementum mi laoreet. Nunc aliquam porta enim nisi amet. Augue congue
          cras quam magna diam et sit sit in. Vitae pellentesque eros ornare
          amet ullamcorper. Nunc metus etiam est lectus et nibh sed tellus quam.
          Sit vel in lorem fusce. Nulla id a enim elementum parturient lacus
          enim. Pulvinar feugiat tempus sollicitudin tellus. Felis vivamus
          aliquet tincidunt id nunc praesent imperdiet sit sit. Aliquet
          vulputate felis eu leo amet pellentesque. Nam scelerisque arcu
          consectetur fusce. In dui lectus in vitae molestie. Platea nascetur
          amet diam orci ac. Erat nam orci ullamcorper nec aliquet lectus tempus
          mauris ante. Tellus nunc sit nisl mi nec pellentesque ultricies felis
          velit. Id eget eget id gravida scelerisque et. At et blandit nunc
          egestas. Dignissim fusce consequat mauris egestas. Consectetur aenean
          euismod quam id vel amet. Sed platea orci faucibus sed nunc at id
          mauris. Eget erat nunc sit aliquam pulvinar ornare. Ultrices
          sollicitudin felis sit faucibus amet. Molestie arcu et fames commodo
          phasellus fames nibh. Morbi magna interdum vel ipsum nulla
          consectetur. Quis elementum tellus lacinia at sollicitudin vulputate
          pretium et nunc. Risus sollicitudin mollis ullamcorper pharetra
          egestas eu ipsum. Sed aliquet nibh et id eget. Sed porttitor ac vitae
          lacus nec egestas donec libero. Ornare adipiscing auctor morbi aliquam
          vestibulum adipiscing pulvinar sit aliquam. Porttitor et semper
          venenatis cursus lorem aliquet. Ut dolor neque sagittis morbi. Cursus
          sed id viverra pellentesque. Sodales elit tortor cras dictum ac non.
          Egestas egestas aliquet pellentesque maecenas luctus et sagittis ut.
          Non tellus donec sagittis potenti quisque vel ac eget ut. Aenean quam
          vitae interdum urna aliquet nulla nam. Penatibus nunc facilisis
          ultricies dolor. Molestie duis lectus eu in elit sed egestas. Donec
          nam donec commodo interdum id ac quam tincidunt egestas. Molestie
          tortor et ornare elementum pharetra metus vitae vulputate. Facilisi
          quam et laoreet massa ultrices a arcu. Aliquam proin morbi tellus
          tempor. Viverra dapibus blandit molestie ultrices donec facilisis
          lacus. Amet id eu euismod nisl sit condimentum laoreet. Nisi quis duis
          placerat id fames eu sed arcu. Non tincidunt est a leo mi maecenas
          diam gravida. Amet magna vitae massa non ac elementum maecenas lacus.
          Tempor purus arcu euismod ut. Habitasse fusce sem ligula amet. Odio
          eros nullam ut faucibus ullamcorper. Orci quis gravida posuere nisl
          tortor massa dignissim. Malesuada vitae neque id suspendisse
          scelerisque dui id. Molestie sollicitudin velit ultricies nisi. Sit
          aliquet nulla lectus mi urna tristique praesent nunc lorem. Quam
          sagittis vel magna nunc accumsan nibh adipiscing neque. Mauris vitae
          sit vitae elementum. Eget id amet cras nibh eget leo. Orci tristique
          sit sapien habitasse feugiat odio sed. Arcu rutrum lacus ut neque
          sagittis nisl. Nisi viverra sed elit id nisl in sed. Tempus ac morbi
          urna auctor ipsum. Nisl eget accumsan ullamcorper venenatis facilisis
          turpis augue. Sed aliquet varius et pellentesque. Ipsum hac vulputate
          tellus neque viverra sit vehicula neque tincidunt. Vestibulum eget
          nunc malesuada sodales. Egestas sagittis ac tortor neque ipsum nibh
          fermentum vitae. Netus bibendum scelerisque nibh semper donec pulvinar
          tortor ornare tortor. Ante pellentesque tellus velit penatibus.
          Gravida morbi diam nunc mauris eleifend sapien eget volutpat. At
          tortor id odio sagittis sapien nec arcu. Elit dignissim mauris eget
          aliquam ac massa pulvinar. Ut quam sit auctor quam. Dignissim diam
          tellus eu erat. Amet tortor tincidunt netus eu tincidunt. Lectus ipsum
          dictumst morbi senectus sit penatibus id neque scelerisque. Risus
          facilisi orci magna velit sed purus ac enim sem. Nunc morbi in pretium
          tortor sollicitudin vestibulum. Turpis eu lectus habitasse ut vitae.
          Ullamcorper turpis ultrices est quis vel tristique eu. Mauris urna
          fermentum etiam tempor.
        </Text>
      </Box>
    </Box>
  );
};

export default About;

const styles = StyleSheet.create({});
