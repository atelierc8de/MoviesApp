import styled from "styled-components/native";
import UColor from "../../system/UColor";

const TextTitle = styled.Text`
  font-size: 20px; 
  color: ${UColor.textDark}; 
  font-weight: bold; 
  padding: 0 20px; 
  margin: 10px 0 5px 0;
`;

const TrailerButton = styled.TouchableOpacity`
  height: 40px;
  flex-direction: row; 
  position: absolute; 
  align-items: center; 
  background-color: rgba(255,255,255,0.2); 
  right: 0;
  padding: 0 10px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  z-index: 100;
`;

const TextMoviesDetail = styled.Text`
  font-size: 16px;
  font-weight: ${props => props.fontWeight ? props.fontWeight : '400'};
  opacity: 0.8;
  color: ${props => props.UColor};
`;

export {TextTitle, TrailerButton, TextMoviesDetail}
