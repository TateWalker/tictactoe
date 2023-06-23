import { ColorData } from "../data/colorData";

export class UtilService {
  getCode(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getColor = () => {
    //move to utils file
    const colors = ColorData;
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex].color;
  };
}

export default new UtilService();
