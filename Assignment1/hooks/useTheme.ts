import {useColorScheme} from "react-native";
import {useDispatch} from "react-redux";
import {lightColors, darkColors} from "../constants/colors";
import {setTheme} from "../store/redux/LightDarkModeRedux/LightarkModeActions";

const useTheme = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? "dark" : "light";
    const dispatch = useDispatch();
    return {colors: theme === "dark" ? darkColors : lightColors};
};
export default useTheme;


