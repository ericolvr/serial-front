

class Utils {
    static NormalizePlus(address) {
        const converted = parseInt(address)+1;
        const str = converted.toString();
        return str
    }
    
    static NormalizeMinus(address) {
        const converted = parseInt(address)-1;
        const str = converted.toString();
        return str
    }
}
export default Utils;