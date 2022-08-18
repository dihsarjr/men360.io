'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "43f9d5e9e6d9770d3b2f8874b7ac0850",
"index.html": "4bd20c6f964ecc4ec1b661935ecefc9f",
"/": "4bd20c6f964ecc4ec1b661935ecefc9f",
"main.dart.js": "01999867601b604b276602b7a52b6399",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "af1f1f6b494293ef9f143e553bf67cb1",
"assets/AssetManifest.json": "0d3ad3418bc868a635a3dee10baa1073",
"assets/NOTICES": "437ad84e76025e19be7c6dca446461cd",
"assets/FontManifest.json": "8f68e48bb28a8f86e48bb73c44425963",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/360.png": "1d9fecfc6b34b2d1d01e00b6a6da2b9f",
"assets/assets/images/360.jpg": "afac5769728103968b308e26380eef73",
"assets/assets/images/gameplan.svg": "2d9e632703e024ab7c1608b5ea81d264",
"assets/assets/images/instagram.svg": "b03fc9b876396af46400ad55a77d2bc5",
"assets/assets/images/circle.png": "2c2928c7fcc2d4aa7f03cd90006103a6",
"assets/assets/images/gameplan.png": "c7a59e4ee8de62bc7b2708639002aebb",
"assets/assets/images/facebook.svg": "513350866134d744b503dec6a608f5a2",
"assets/assets/images/twitter.80e63d12.svg": "80e63d127b2a5a891830004071ae07db",
"assets/assets/images/youtube.svg": "a9282716f58e95bf5643ad2a7a25a031",
"assets/assets/images/4.png": "bb12733cd5d66dba88a51b21c9fa7dfe",
"assets/assets/images/linkedin.svg": "30d1b33327620ded0598147241cdc1ab",
"assets/assets/images/twitter.svg": "80e63d127b2a5a891830004071ae07db",
"assets/assets/images/2.png": "65792620c4adfd24700a12a3ecd4e544",
"assets/assets/images/Online%2520Doctor-rafiki.svg": "f4fe5500f9addf4d516fbadffc360196",
"assets/assets/images/3.png": "615740efb6e5415dbc4e26930b1dc239",
"assets/assets/images/hair.webp": "2a64340d8e36b993bc78b8680b7ecf98",
"assets/assets/images/1.png": "081589258b46b189dc587c644b118fe4",
"assets/assets/fonts/OpenSans-SemiBold.ttf": "984b9097c910bf2f182889707e2e4cbe",
"assets/assets/fonts/OpenSans-Light.ttf": "0652ba43f7a92220fbc18a5519fbf2c1",
"assets/assets/fonts/OpenSans-Italic.ttf": "90f74e681980c2ef280a3d24006e5b35",
"assets/assets/fonts/OpenSans-MediumItalic.ttf": "7e93c9a251c09d9984721aeb3bd8f976",
"assets/assets/fonts/OpenSans-ExtraBold.ttf": "8fd58ae86936600201df265f1112a014",
"assets/assets/fonts/OpenSans-LightItalic.ttf": "c0d0b7abb91323f27be4a42269f31ef1",
"assets/assets/fonts/OpenSans-Bold.ttf": "ff615c954fc5485fb3757516721b41ff",
"assets/assets/fonts/OpenSans-SemiBoldItalic.ttf": "d94afe8b2ccf8210aac58024276bcc06",
"assets/assets/fonts/OpenSans-Medium.ttf": "7a56b1bba54be9caf32f096d8224a492",
"assets/assets/fonts/OpenSans-ExtraBoldItalic.ttf": "7f86cc2636f0adadc0dec52009c0545f",
"assets/assets/fonts/OpenSans-Regular.ttf": "58b1f440729d267697bddcddb994bce9",
"assets/assets/fonts/OpenSans-BoldItalic.ttf": "f288e82f90d27a27ba22a4c0561896f8",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
