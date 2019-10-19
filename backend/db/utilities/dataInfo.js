const dataInfo = (dataType = "price", dataGroup = "hour", DataPeriod = 1) => {
    let groupTime = {
        hour: 1,
        day: 24,
        week: 24 * 7
    };

    let type = dataType;
    let group = dataGroup;
    let period = DataPeriod;

    let name = `${DataPeriod} ${dataGroup} ${dataType}`;
    let seconds = 3600 * DataPeriod * groupTime[dataGroup];

    return { type, group, period, name, seconds };
};

module.exports = dataInfo;
