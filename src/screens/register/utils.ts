

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

    static FormatSerial(data) {
        const equipment = data['equipment'];
        const serial_number = data['serial_number'];
        const final = `ATK${equipment}${serial_number}`;
        return final

    }
}
export default Utils;