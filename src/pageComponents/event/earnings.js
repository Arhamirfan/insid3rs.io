import appApi from '../../api/app';
const saveEarning = (id, earningFor, earningType, amount, serviceFee, royaltyFee) => {
    return appApi.saveAdminEarning(id, { earningFor, earningType, amount, serviceFee, royaltyFee }).then((result) => {
        if (result && result.status == 200) {
            console.log("earning result:", result.data.data)
            return { error: false, data: result }
        }
    }).catch((error) => {
        console.log("🚀 ~ file: earnings.js:11 ~ earnings ~ error:", error)
        return { error: true, data: { error: error.message } }
    });
}

export default saveEarning