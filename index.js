function CreateYandexMap(longitude, latitude) {
    if (Math.abs(longitude) > 180) {
        throw new Error('Static-Yandex-Map: Longitude can be from -180 to +180 degrees!');
    }

    if (Math.abs(latitude) > 90) {
        throw new Error('Static-Yandex-Map: Latitude can be from -90 to +90 degrees!');
    }

    this.url = 'http://static-maps.yandex.ru/1.x/';
    this.parameters = {
        'll': longitude + ',' + latitude,
        'l': 'map',
        'lang': 'ru-RU',
        'size': '650,450'
    };
    if(process.env.yandexMapApiKey){
        this.parameters.key=process.env.yandexMapApiKey;
    }
    this.points = [];
    return this;
}


CreateYandexMap.prototype.setType = function (type) {
    switch (type) {
        case 'map':
            this.parameters.l = "map";
            break;
        case 'satellite':
            this.parameters.l = "sat";
            break;
        case 'hybrid':
            this.parameters.l = "sat,skl";
            break;
        case 'traffic':
            this.parameters.l = "map,trf";
            break;
        default:
            throw new Error('Static-Yandex-Map: Map type can be one of follows : "map","satellite","hybrid","traffic"');
    }
    return this;
}

CreateYandexMap.prototype.setSpan = function (longitudeSpanDegrees, latitudeSpanDegrees) {
    this.parameters.spn = longitudeSpanDegrees + ',' + latitudeSpanDegrees;
    return this;
}

CreateYandexMap.prototype.setSize = function (width, height) {
    if (!(width > 0 && width <= 650)) {
        throw new Error('Static-Yandex-Map: Map width can be from 1 to 650 pixels!')
    }

    if (!(height > 0 && height <= 450)) {
        throw new Error('Static-Yandex-Map: Map height can be from 1 to 450 pixels!')
    }

    this.parameters.size = '' + width + ',' + height;
    return this;
}

CreateYandexMap.prototype.setZ = function (z) {
    if (z >= 0 && z <= 17) {
        this.parameters.z = z;
        return this;
    } else {
        throw new Error('Static-Yandex-Map: Scale(z) is from 0 to 17!');
    }

}

CreateYandexMap.prototype.setKey = function (key) {
    this.parameters.key = key;
    return this;
}

CreateYandexMap.prototype.setLang = function (lang) {
    switch (lang) {
        case 'ru-RU':
            this.parameters.lang = 'ru-RU';
            break;
        case 'tr-TR':
            this.parameters.lang = 'tr-TR';
            break;
        case 'en-US':
            this.parameters.lang = 'en-US';
            break;
        case 'uk-UA':
            this.parameters.lang = 'uk-UA';
            break;
        default:
            throw new Error('Static-Yandex-Map: Locale can be one of ru-RU(default), tr-TR, en-US, uk-UA!');
    }
    return this;
}
//http://api.yandex.ru/maps/doc/staticapi/1.x/dg/concepts/markers.xml
CreateYandexMap.prototype.addPoint = function (longitude, latitude, style, color, size, content) {
    var pointText = longitude + ',' + latitude + ',' + style + '' + color + '' + size + '' + content;
    this.points.push(pointText);
    return this;
}

CreateYandexMap.prototype.getUrl = function () {
    var params = [];
    for (var x in this.parameters) {
        params.push('' + x + '=' + this.parameters[x]);
    }

    return ('' + this.url + '?' + params.join('&') + ((this.points.length > 0) ? ('&pt=' + this.points.join('~')) : ''));
}

CreateYandexMap.prototype.toString = function () {
    return this.getUrl();
}
exports = module.exports = CreateYandexMap;