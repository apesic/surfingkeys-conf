// ---- Cleanup ----//
// Unmap undesired defaults
const unmaps = [
  "sb", "sw", "ob",
  "ow", "cp", ";cp",
  ";ap", "spa", "spb",
  "spd", "sps", "spc",
  "spi", "sfr", "zQ",
  "zz", "zR", "ab",
  "Q", "q", "ag",
  "af", ";s", "yp",
]

unmaps.forEach((u) => {
  unmap(u)
})

const rmSearchAliases =
  {
    s: ["g", "d", "b",
      "w", "s", "h"],
  }

Object.keys(rmSearchAliases).forEach((k) => {
  rmSearchAliases[k].forEach((v) => {
    removeSearchAliasX(v, k)
  })
})

// ---- Settings ----//
settings.hintAlign = "left"
settings.omnibarSuggestionTimeout = 500
settings.hintGroups = true
// settings.hintGroupStart = "middle";
settings.richHintsForKeystroke = 1

// ---- Theme ----//
settings.theme = `
    /* Disable RichHints CSS animation */
    .expandRichHints {
        animation: 0s ease-in-out 1 forwards expandRichHints;
    }
    .collapseRichHints {
        animation: 0s ease-in-out 1 forwards collapseRichHints;
    }
`

// ---- Site-Specific Settings ----//
if (/github\.com/.test(window.location.hostname)) {
  settings.theme += `
sk_theme {
    background: #000;
    color: #fff;
}
.sk_theme tbody {
    color: #fff;
}
.sk_theme input {
    color: #d9dce0;
}
.sk_theme .url {
    color: #2173c5;
}
.sk_theme .annotation {
    color: #38f;
}
.sk_theme .omnibar_highlight {
    color: #fbd60a;
}
.sk_theme ul>li:nth-child(odd) {
    background: #1e211d;
}
.sk_theme ul>li.focused {
    background: #4ec10d;
}`
}

// ---- Maps ----//
// Left-hand aliases
// Movement
map("w", "k")
map("s", "j")

// Right-hand aliases
// Tab Navigation
map("J", "E")
map("K", "R")

// History
map("H", "S")
map("L", "D")

// ---- Functions ----//
function fakeSpot() {
  const url = `http://fakespot.com/analyze?url=${window.location.href}`
  window.open(url, "_blank").focus()
}

function ytFullscreen() {
  $(".ytp-fullscreen-button.ytp-button").click()
}

function vimeoFullscreen() {
  $(".fullscreen-icon").click()
}

function ghStar(toggle) {
  const repo = window.location.pathname.slice(1).split("/").slice(0, 2).join("/")
  const cur = $("div.starring-container > form").filter(function filter() {
    return $(this).css("display") === "block"
  })

  let star = "★"
  let status = "starred"
  let verb = "is"

  const starred = $(cur).attr("class").indexOf("unstarred") === -1
  if (starred && toggle) {
    status = `un${status}`
    star = "☆"
  }

  if (toggle) {
    $(cur).find("button").click()
    verb = "has been"
  }

  Front.showBanner(`${star} Repository ${repo} ${verb} ${status}!`)
}

function glToggleStar() {
  const repo = window.location.pathname.slice(1).split("/").slice(0, 2).join("/")
  const action = `${$(".btn.star-btn > span").click().text().toLowerCase()}red`
  let star = "☆"
  if (action === "starred") {
    star = "★"
  }
  Front.showBanner(`${star} Repository ${repo} ${action}`)
}

function vimEditURL() {
  Front.showEditor(window.location.href, (data) => {
    window.location.href = data
  }, "url")
}

function whois() {
  const url = `http://centralops.net/co/DomainDossier.aspx?dom_whois=true&addr=${window.location.hostname}`
  window.open(url, "_blank").focus()
}

function dns() {
  const url = `http://centralops.net/co/DomainDossier.aspx?dom_dns=true&addr=${window.location.hostname}`
  window.open(url, "_blank").focus()
}

function dnsVerbose() {
  const url = `http://centralops.net/co/DomainDossier.aspx?dom_whois=true&dom_dns=true&traceroute=true&net_whois=true&svc_scan=true&addr=${window.location.hostname}`
  window.open(url, "_blank").focus()
}

function togglePdfViewer() {
  chrome.storage.local.get("noPdfViewer", (resp) => {
    if (!resp.noPdfViewer) {
      chrome.storage.local.set({ noPdfViewer: 1 }, () => {
        Front.showBanner("PDF viewer disabled.")
      })
    } else {
      chrome.storage.local.remove("noPdfViewer", () => {
        Front.showBanner("PDF viewer enabled.")
      })
    }
  })
}

function getURLPath(count, domain) {
  let path = window.location.pathname.slice(1)
  if (count) {
    path = path.split("/").slice(0, count).join("/")
  }
  if (domain) {
    path = `${window.location.hostname}/${path}`
  }
  return path
}

function copyURLPath(count, domain) {
  Front.writeClipboard(getURLPath(count, domain))
}

function viewGodoc() {
  const repo = getURLPath(2, true)
  tabOpenLink(`https://godoc.org/${repo}`)
}

function editSettings() {
  tabOpenLink("/pages/options.html")
}

function redditCollapseComment() {
  Hints.create(".expand", Hints.dispatchMouseClick)
}

function redditCollapseNextComment() {
  Hints.create(".expand:visible:not(:contains('[+]')):nth(0)", Hints.dispatchMouseClick)
}

function redditExpando() {
  Hints.create(".expando-button", Hints.dispatchMouseClick)
}

function redditUpvote() {
  Hints.create(".arrow.up", Hints.dispatchMouseClick)
}

function redditDownvote() {
  Hints.create(".arrow.down", Hints.dispatchMouseClick)
}

function redditViewLink() {
  Hints.create(".title", Hints.dispatchMouseClick)
}

function redditViewComments() {
  Hints.create(".comments", Hints.dispatchMouseClick)
}

function hnCollapseComment() {
  Hints.create(".togg", Hints.dispatchMouseClick)
}

function hnCollapseNextComment() {
  Hints.create(".togg:visible:contains('[-]'):nth(0)", Hints.dispatchMouseClick)
}

function hnUpvote() {
  Hints.create(".votearrow[title='upvote']", Hints.dispatchMouseClick)
}

function hnDownvote() {
  Hints.create(".votearrow[title='downvote']", Hints.dispatchMouseClick)
}

function hnViewLink() {
  Hints.create(".storylink", Hints.dispatchMouseClick)
}

function hnViewComments() {
  Hints.create("td > a[href*='item']:not(.storylink)", Hints.dispatchMouseClick)
}

function twitterFollowUser() {
  Hints.create(".follow-button", Hints.dispatchMouseClick)
}

function twitterLikeTweet() {
  Hints.create(".js-actionFavorite", Hints.dispatchMouseClick)
}

function twitterRetweet() {
  Hints.create(".js-actionRetweet", Hints.dispatchMouseClick)
}

function twitterReply() {
  Hints.create(".js-actionReply", Hints.dispatchMouseClick)
}

function twitterTweet() {
  Hints.create(".js-global-new-tweet", Hints.dispatchMouseClick)
}

function twitterTweetTo() {
  Hints.create(".NewTweetButton", Hints.dispatchMouseClick)
}

function twitterReload() {
  Hints.create(".new-tweets-bar", Hints.dispatchMouseClick)
}

function twitterGotoUser() {
  Hints.create(".js-user-profile-link", Hints.dispatchMouseClick)
}

function hnGoParent() {
  const par = $(".par>a")
  if (par.length <= 0) return
  window.location.href = par[0].href
}

function dribbleHeartShot() {
  Hints.create(".toggle-fav, .like-shot", Hints.dispatchMouseClick)
}

// ---- Mapkeys ----//
const ri = { repeatIgnore: true }

mapkey("=w", "Lookup whois information for domain", whois, ri)
mapkey("=d", "Lookup dns information for domain", dns, ri)
mapkey("=D", "Lookup all information for domain", dnsVerbose, ri)
mapkey(";se", "#11Edit Settings", editSettings, ri)
mapkey(";pd", "Toggle PDF viewer from SurfingKeys", togglePdfViewer, ri)
mapkey("gi", "Edit current URL with vim editor", vimEditURL, ri)
mapkey("yp", "Copy URL path of current page", () => copyURLPath(), ri)

const siteleader = "<Space>"

function mapsitekey(domainRegex, key, desc, f, o) {
  const opts = o || {}
  mapkey(`${siteleader}${key}`, desc, f, Object.assign({}, opts, { domain: domainRegex }))
}

function mapsitekeys(d, maps) {
  const domain = d.replace(".", "\\.")
  const domainRegex = new RegExp(`^http(s)?://(([a-zA-Z0-9-_]+\\.)*)(${domain})(/.*)?`)
  maps.forEach((map) => {
    mapsitekey(domainRegex, map[0], map[1], map[2])
  })
}

mapsitekeys("amazon.com", [
  ["fs", "Fakespot", fakeSpot],
  // TODO: Add to cart
])

mapsitekeys("yelp.com", [
  ["fs", "Fakespot", fakeSpot],
])

mapsitekeys("youtube.com", [
  ["F", "Toggle fullscreen", ytFullscreen],
])

mapsitekeys("vimeo.com", [
  ["F", "Toggle fullscreen", vimeoFullscreen],
])

mapsitekeys("github.com", [
  ["s", "Toggle Star", () => ghStar(true)],
  ["S", "Check Star", () => ghStar(false)],
  ["y", "Copy Project Path", () => copyURLPath(2)],
  ["Y", "Copy Project Path (including domain)", () => copyURLPath(2, true)],
  ["D", "View GoDoc for Project", viewGodoc],
])

mapsitekeys("gitlab.com", [
  ["s", "Toggle Star", glToggleStar],
  ["y", "Copy Project Path", () => copyURLPath(2)],
  ["Y", "Copy Project Path (including domain)", () => copyURLPath(2, true)],
  ["D", "View GoDoc for Project", viewGodoc],
])

mapsitekeys("twitter.com", [
  ["t", "New tweet", twitterTweet],
  ["f", "Follow user", twitterFollowUser],
  ["g", "Goto user", twitterGotoUser],
  ["s", "Like tweet", twitterLikeTweet],
  ["r", "Retweet", twitterRetweet],
  ["c", "Comment/Reply", twitterReply],
  ["T", "Tweet to", twitterTweetTo],
  ["R", "Load new tweets", twitterReload],
])

mapsitekeys("reddit.com", [
  ["x", "Collapse comment", redditCollapseComment],
  ["X", "Collapse next comment", redditCollapseNextComment],
  ["s", "Upvote", redditUpvote],
  ["S", "Downvote", redditDownvote],
  ["e", "Expand expando", redditExpando],
  ["a", "View post (link)", redditViewLink],
  ["c", "View post (comments)", redditViewComments],
])

mapsitekeys("news.ycombinator.com", [
  ["x", "Collapse comment", hnCollapseComment],
  ["X", "Collapse next comment", hnCollapseNextComment],
  ["s", "Upvote", hnUpvote],
  ["S", "Downvote", hnDownvote],
  ["p", "Go to parent", hnGoParent],
  ["a", "View post (link)", hnViewLink],
  ["c", "View post (comments)", hnViewComments],
])

mapsitekeys("dribbble.com", [
  ["s", "Heart Shot", dribbleHeartShot],
])

// ---- Search & completion ----//
// Search leader
const sl = "a"

// Register Search Engine Completions
// The `completions` variable is defined in `completions.js` and
// is prepended to this file by gulp-concat.
Object.keys(completions).forEach((k) => {
  const s = completions[k] // Search Engine object
  const la = sl + s.alias // Search leader + alias

  addSearchAliasX(s.alias, s.name, s.search, sl, s.compl, s.callback)
  mapkey(la, `#8Search ${s.name}`, `Front.openOmnibar({type: "SearchEngine", extra: "${s.alias}"})`)
})

// vim: set ft=javascript expandtab:
