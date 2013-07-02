var stym = require('./../index.js'),
    vows = require('vows'),
    assert = require('assert'),
    url = require('url');

vows.describe('URL generator for Yandex Maps').addBatch(
    {
        'Testing URL generator': {
            'topic': {StaticYandexMaps: stym},
            'it have a function to getUrl': function (topic) {
                assert.isFunction(topic.StaticYandexMaps);
                var mapObj = new topic.StaticYandexMaps(37.620070, 55.753630);
                assert.isFunction(mapObj.getUrl);
            },
            'it accepts coordinates and creates an URL': function (topic) {
                var mapObj = new topic.StaticYandexMaps(37.620070, 55.753630);
                var mapUrl = mapObj.getUrl();
                var urlParams = url.parse(mapUrl);
                assert.equal(urlParams.protocol, 'http:');
                assert.ok(urlParams.slashes);
                assert.equal(urlParams.host, 'static-maps.yandex.ru');
                assert.equal(urlParams.search, '?ll=37.62007,55.75363&l=map&lang=ru-RU&size=650,450&key=ALTJHk8BAAAAREWTEg==');
                assert.equal(urlParams.query, 'll=37.62007,55.75363&l=map&lang=ru-RU&size=650,450&key=ALTJHk8BAAAAREWTEg==');
                assert.equal(urlParams.pathname, '/1.x/');
                assert.equal(urlParams.path, '/1.x/?ll=37.62007,55.75363&l=map&lang=ru-RU&size=650,450&key=ALTJHk8BAAAAREWTEg==');
                assert.equal(urlParams.href, 'http://static-maps.yandex.ru/1.x/?ll=37.62007,55.75363&l=map&lang=ru-RU&size=650,450&key=ALTJHk8BAAAAREWTEg==');
            },
            'it accepts coordinates and API key and creates an URL': function (topic) {
                var mapObj = new topic.StaticYandexMaps(37.620070, 55.753630).setKey('ya_lubly_myaso');
                var mapUrl = mapObj.getUrl();
                var urlParams = url.parse(mapUrl);
                assert.equal(urlParams.protocol, 'http:');
                assert.ok(urlParams.slashes);
                assert.equal(urlParams.host, 'static-maps.yandex.ru');
                assert.equal(urlParams.search, '?ll=37.62007,55.75363&l=map&lang=ru-RU&size=650,450&key=ya_lubly_myaso');
                assert.equal(urlParams.query, 'll=37.62007,55.75363&l=map&lang=ru-RU&size=650,450&key=ya_lubly_myaso');
                assert.equal(urlParams.pathname, '/1.x/');
                assert.equal(urlParams.path, '/1.x/?ll=37.62007,55.75363&l=map&lang=ru-RU&size=650,450&key=ya_lubly_myaso');
                assert.equal(urlParams.href, 'http://static-maps.yandex.ru/1.x/?ll=37.62007,55.75363&l=map&lang=ru-RU&size=650,450&key=ya_lubly_myaso');
            },
            'it accepts coordinates and chainable methods, and it creates the url to!': function (topic) {
                var mapObj = new topic.StaticYandexMaps(37.620070, 55.753630)
                    .setZ(13)
                    .setType('satellite')
                    .setSize(650, 450)
                    .setZ(13)
                    .setLang('en-US')
                    .addPoint(37.620070, 55.753630, 'pm', 'wt', 'm', 1)
                    .addPoint(37.64, 55.76363, 'pm', 'wt', 'm', 99);
                var mapUrl = mapObj.getUrl();
                var urlParams = url.parse(mapUrl);
                assert.equal(urlParams.protocol, 'http:');
                assert.ok(urlParams.slashes);
                assert.equal(urlParams.host, 'static-maps.yandex.ru');
                assert.equal(urlParams.search, '?ll=37.62007,55.75363&l=sat&lang=en-US&size=650,450&key=ALTJHk8BAAAAREWTEg==&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99');
                assert.equal(urlParams.query, 'll=37.62007,55.75363&l=sat&lang=en-US&size=650,450&key=ALTJHk8BAAAAREWTEg==&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99');
                assert.equal(urlParams.pathname, '/1.x/');
                assert.equal(urlParams.path, '/1.x/?ll=37.62007,55.75363&l=sat&lang=en-US&size=650,450&key=ALTJHk8BAAAAREWTEg==&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99');
                assert.equal(urlParams.href, 'http://static-maps.yandex.ru/1.x/?ll=37.62007,55.75363&l=sat&lang=en-US&size=650,450&key=ALTJHk8BAAAAREWTEg==&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99');
            },
            'it is convertable to string via typecast': function (topic) {
                var mapObj = new topic.StaticYandexMaps(37.620070, 55.753630)
                    .setZ(13)
                    .setType('map')
                    .setSize(650, 450)
                    .setZ(13)
                    .setLang('en-US')
                    .addPoint(37.620070, 55.753630, 'pm', 'wt', 'm', 1)
                    .addPoint(37.64, 55.76363, 'pm', 'wt', 'm', 99);
                var mapUrl = '' + mapObj;
                var urlParams = url.parse(mapUrl);
                assert.equal(urlParams.protocol, 'http:');
                assert.ok(urlParams.slashes);
                assert.equal(urlParams.host, 'static-maps.yandex.ru');
                assert.equal(urlParams.search, '?ll=37.62007,55.75363&l=map&lang=en-US&size=650,450&key=ALTJHk8BAAAAREWTEg==&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99');
                assert.equal(urlParams.query, 'll=37.62007,55.75363&l=map&lang=en-US&size=650,450&key=ALTJHk8BAAAAREWTEg==&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99');
                assert.equal(urlParams.pathname, '/1.x/');
                assert.equal(urlParams.path, '/1.x/?ll=37.62007,55.75363&l=map&lang=en-US&size=650,450&key=ALTJHk8BAAAAREWTEg==&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99');
                assert.equal(urlParams.href, 'http://static-maps.yandex.ru/1.x/?ll=37.62007,55.75363&l=map&lang=en-US&size=650,450&key=ALTJHk8BAAAAREWTEg==&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99');
            },
            'it is convertable to string via toString': function (topic) {
                var mapObj = new topic.StaticYandexMaps(37.620070, 55.753630)
                    .setZ(13)
                    .setType('map')
                    .setSize(650, 450)
                    .setZ(13)
                    .setLang('en-US')
                    .addPoint(37.620070, 55.753630, 'pm', 'wt', 'm', 1)
                    .addPoint(37.64, 55.76363, 'pm', 'wt', 'm', 99);
                var mapUrl = mapObj.toString();
                var urlParams = url.parse(mapUrl);
                assert.equal(urlParams.protocol, 'http:');
                assert.ok(urlParams.slashes);
                assert.equal(urlParams.host, 'static-maps.yandex.ru');
                assert.equal(urlParams.search, '?ll=37.62007,55.75363&l=map&lang=en-US&size=650,450&key=ALTJHk8BAAAAREWTEg==&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99');
                assert.equal(urlParams.query, 'll=37.62007,55.75363&l=map&lang=en-US&size=650,450&key=ALTJHk8BAAAAREWTEg==&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99');
                assert.equal(urlParams.pathname, '/1.x/');
                assert.equal(urlParams.path, '/1.x/?ll=37.62007,55.75363&l=map&lang=en-US&size=650,450&key=ALTJHk8BAAAAREWTEg==&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99');
                assert.equal(urlParams.href, 'http://static-maps.yandex.ru/1.x/?ll=37.62007,55.75363&l=map&lang=en-US&size=650,450&key=ALTJHk8BAAAAREWTEg==&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99');
            },
            'it throws errors for coordinates from perpendicular world': function (topic) {
                try {
                    var mapObj = new topic.StaticYandexMaps(237.620070, 55.753630);
                } catch (e) {
                    assert.equal(e.message, 'Static-Yandex-Map: Longitude can be from -180 to +180 degrees!');
                }

                try {
                    var mapObj = new topic.StaticYandexMaps(37.620070, 255.753630);
                } catch (e) {
                    assert.equal(e.message, 'Static-Yandex-Map: Latitude can be from -90 to +90 degrees!');
                }
            },
            'it throws errors for unsupported locale': function (topic) {
                try {
                    var mapObj = new topic.StaticYandexMaps(37.620070, 55.753630)
                        .setLang('ud-UD');

                } catch (e) {
                    assert.equal(e.message, 'Static-Yandex-Map: Locale can be one of ru-RU(default), tr-TR, en-US, uk-UA!');
                }
            },
            'it throws errors for unsupported map types': function (topic) {
                try {
                    var mapObj = new topic.StaticYandexMaps(37.620070, 55.753630)
                        .setType('perpendicular map');

                } catch (e) {
                    assert.equal(e.message, 'Static-Yandex-Map: Map type can be one of follows : "map","satellite","hybrid","traffic"');
                }
            },
            'it throws errors for very big map image': function (topic) {
                try {
                    var mapObj = new topic.StaticYandexMaps(37.620070, 55.753630)
                        .setSize(651, 450)
                } catch (e) {
                    assert.equal(e.message, 'Static-Yandex-Map: Map width can be from 1 to 650 pixels!');
                }
                try {
                    var mapObj = new topic.StaticYandexMaps(37.620070, 55.753630)
                        .setSize(650, 451)
                } catch (e) {
                    assert.equal(e.message, 'Static-Yandex-Map: Map height can be from 1 to 450 pixels!');
                }
            }
        }}
).export(module);