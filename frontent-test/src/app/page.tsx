"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { WordPressPost, WordPressMedia } from "@/types/wordpress"
import PostCard from "@/components/PostCard"
import Pagination from "@/components/Pagination"

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

// Sample data based on the provided JSON
const samplePosts: WordPressPost[] = [
  {
    id: 16328,
    date: "2025-05-12T14:32:53",
    slug: "swenstromskas-stenugnsbageri-till-bergvik",
    link: "https://bergvik.se/aktuellt/swenstromskas-stenugnsbageri-till-bergvik/",
    title: {
      rendered: "Swenströmskas Stenugnsbageri till Bergvik",
    },
    content: {
      rendered:
        "<p>Vi är superglada att kunna berätta att familjeföretaget Swenströmskas Stenugnsbageri öppnar hos oss på Bergvik!<br />\nSwenströmskas Stenugnsbageri är ett hantverksbageri som bakar med surdeg i stenugn. Verksamheten består av bageri, konditori och kallskänk och allt görs från grunden.</p>\n<p>Samma goda sortiment som finns på bageriet i stan kommer erbjudas på Bergvik. Stilen på inredningen kommer att vara det samma och framförallt så kommer de gulliga kopparna till kaffet också att följa med.</p>\n<p>&nbsp;</p>\n",
    },
    excerpt: {
      rendered:
        "<p>Vi är superglada att kunna berätta att familjeföretaget Swenströmskas Stenugnsbageri öppnar hos oss på Bergvik! Swenströmskas Stenugnsbageri är ett hantverksbageri som bakar med surdeg i stenugn. Verksamheten består av bageri, konditori och kallskänk och allt görs från grunden. Samma goda sortiment som finns på bageriet i stan kommer erbjudas på Bergvik. Stilen på inredningen kommer [&hellip;]</p>\n",
    },
    featured_media: 16329,
    categories: [1],
    author: 15,
  },
  {
    id: 16091,
    date: "2025-04-04T15:24:49",
    slug: "premiar-arets-smakradstips",
    link: "https://bergvik.se/aktuellt/premiar-arets-smakradstips/",
    title: {
      rendered: "Premiär för årets Smakrådstips på Bergvik",
    },
    content: {
      rendered:
        '<p>Först ut är Ella, som i en ny film delar med sig av sina personliga favoriter och hjälper Ida Hallquist att bli redo för vårsäsongen – missa inte det!</p>\n<p><strong>Vill du ha ännu mer inspiration?</strong><br />\nUtforska hela smakteamet och ta del av trendspaningar, produktfavoriter och säsongens bästa idéer.</p>\n<p>👉 <a href="https://bergvik.se/smakradet/tips/beautyrutin/">Se filmen här</a><br />\n👉 <a href="https://bergvik.se/smakradet/">Upptäck årets smakprofiler och deras bästa tips</a></p>\n',
    },
    excerpt: {
      rendered:
        "<p>Först ut är Ella, som i en ny film delar med sig av sina personliga favoriter och hjälper Ida Hallquist att bli redo för vårsäsongen – missa inte det! Vill du ha ännu mer inspiration? Utforska hela smakteamet och ta del av trendspaningar, produktfavoriter och säsongens bästa idéer. 👉 Se filmen här 👉 Upptäck årets [&hellip;]</p>\n",
    },
    featured_media: 16093,
    categories: [1],
    author: 1,
  },
  {
    id: 16071,
    date: "2025-04-03T15:22:51",
    slug: "vaccindirekt-oppnar-pa-bergvik",
    link: "https://bergvik.se/aktuellt/vaccindirekt-oppnar-pa-bergvik/",
    title: {
      rendered: "VaccinDirekt öppnar på Bergvik!",
    },
    content: {
      rendered:
        "<p>11 april öppnar Vaccindirekt hos oss på Bergvik. Mottagningen kommer finnas belägen vid Bronsentrén och erbjuda alla typer av vaccin för både barn och vuxna, även hälsokontroller och medicinska intyg. Ska du resa utomlands är Vaccindirekt experter på resemedicinsk rådgivning och resevaccinationer. Varmt välkomna till Bergvik säger vi till VaccinDirekt!</p>\n",
    },
    excerpt: {
      rendered:
        "<p>11 april öppnar Vaccindirekt hos oss på Bergvik. Mottagningen kommer finnas belägen vid Bronsentrén och erbjuda alla typer av vaccin för både barn och vuxna, även hälsokontroller och medicinska intyg. Ska du resa utomlands är Vaccindirekt experter på resemedicinsk rådgivning och resevaccinationer. Varmt välkomna till Bergvik säger vi till VaccinDirekt!</p>\n",
    },
    featured_media: 16073,
    categories: [1],
    author: 15,
  },
  {
    id: 16068,
    date: "2025-04-03T15:21:02",
    slug: "zoo-se-oppnar-pa-bergvik",
    link: "https://bergvik.se/aktuellt/zoo-se-oppnar-pa-bergvik/",
    title: {
      rendered: "Zoo.se öppnar på Bergvik!",
    },
    content: {
      rendered:
        '<p>10 april kl 10:00 öppnar djurbutikskedjan <strong><a href="https://eur02.safelinks.protection.outlook.com/?url=https%3A%2F%2Fl.facebook.com%2Fl.php%3Fu%3Dhttp%253A%252F%252FZoo.se%252F%253Ffbclid%253DIwZXh0bgNhZW0CMTAAAR2cZhO_h5abQMiH_NUaBX2W5Wc0ovZvCjYcDBGHMg9T5cRcUpyNie0I58E_aem_urE8eJLqtGxAYYQyOma-kw%26h%3DAT1i3dXvMTf17Azqi3gTEekPPAX5yFOL_Qq9sZX32ASBEhZxXcaNWlGqgl5V2JvrrD2uRAP7vGGrfkCYArJAkcs99rbGW2KXO114n-LmI9TcEchG9AhA2OwWje17uWi_C4-FvYiRjCcvQNyFPRUGm6_Q0Fc61-HREjY%26__tn__%3D-UK-R%26c%5B0%5D%3DAT13J2ToBAdhKXyURbHDQpU1KD7PJtJKgvtSEmyLyKtmDqnHFF1um8JujvurlwSxNMRStTL5Tmqw3KL32wkbuo1tnuzfvLkpCrDSELJrGuMPCxSJ2EEgpGm5cs9xQZzHpWcxV6pfAWHdhR0klEG5tNKm__zQ50yakF4xFhQuzLrX92ktDZr_nACNcJRMkcCBGmNTgBlS4ovOB9cescz8-N-8mQ&amp;data=05%7C02%7Culrika.danielsson%40newsec.se%7Cf47083e6f1d74429ca6e08dd72b039ed%7Ca76b06e3f40049db84dfe9a75fa473f6%7C1%7C0%7C638792823444403890%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&amp;sdata=p12l7hqdSw1Zy4kVnCADpZWoork26MBBpVxZaYKZLZc%3D&amp;reserved=0">Zoo.se</a></strong> hos oss på Bergvik. De kommer att erbjuda akvarier med fiskar och ett stort sortiment av sällskapsdjurs-produkter med över 550 varumärken.</p>\n<p>&#8211; Vi är glada och stolta över att <strong><a href="https://eur02.safelinks.protection.outlook.com/?url=http%3A%2F%2Fzoo.se%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR2PbbbiZ9bApCbsVXgfbDVVNLrE1U2shC-XBbXa8JjCo99HGAsQVfeZBtQ_aem_CUbfIXK0FGOxH-dTnIFntw&amp;data=05%7C02%7Culrika.danielsson%40newsec.se%7Cf47083e6f1d74429ca6e08dd72b039ed%7Ca76b06e3f40049db84dfe9a75fa473f6%7C1%7C0%7C638792823444422742%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&amp;sdata=q2TDcPcBL%2FyrHq24V0b08kmNRE7Fqwpw51sYj5JObnk%3D&amp;reserved=0">Zoo.se</a></strong> väljer att etablera sig hos oss på Bergvik, säger vår centrumchef Olof. Vi jobbar efter att ständigt utveckla, förnya, och komplettera vår handelsplats. Just <strong><a href="https://eur02.safelinks.protection.outlook.com/?url=https%3A%2F%2Fl.facebook.com%2Fl.php%3Fu%3Dhttp%253A%252F%252FZoo.se%252F%253Ffbclid%253DIwZXh0bgNhZW0CMTAAAR019xQVR8mg4NcWU9yvkr0TXFLhoq7M9IP9WsMJgU_jkbW5oPpvAD8nbGU_aem_mlLNqCA0taYVN8DD9HJadA%26h%3DAT1i3dXvMTf17Azqi3gTEekPPAX5yFOL_Qq9sZX32ASBEhZxXcaNWlGqgl5V2JvrrD2uRAP7vGGrfkCYArJAkcs99rbGW2KXO114n-LmI9TcEchG9AhA2OwWje17uWi_C4-FvYiRjCcvQNyFPRUGm6_Q0Fc61-HREjY%26__tn__%3D-UK-R%26c%5B0%5D%3DAT13J2ToBAdhKXyURbHDQpU1KD7PJtJKgvtSEmyLyKtmDqnHFF1um8JujvurlwSxNMRStTL5Tmqw3KL32wkbuo1tnuzfvLkpCrDSELJrGuMPCxSJ2EEgpGm5cs9xQZzHpWcxV6pfAWHdhR0klEG5tNKm__zQ50yakF4xFhQuzLrX92ktDZr_nACNcJRMkcCBGmNTgBlS4ovOB9cescz8-N-8mQ&amp;data=05%7C02%7Culrika.danielsson%40newsec.se%7Cf47083e6f1d74429ca6e08dd72b039ed%7Ca76b06e3f40049db84dfe9a75fa473f6%7C1%7C0%7C638792823444436304%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&amp;sdata=sLA%2FQI2zj2Ox1J1TgT5Sq4fmttcpfFAjZuiKw4eInOA%3D&amp;reserved=0">Zoo.se</a></strong> är en unik butik som jag vet att våra kunder har önskat och frågat efter en längre tid.</p>\n<p>På <strong><a href="https://eur02.safelinks.protection.outlook.com/?url=https%3A%2F%2Fl.facebook.com%2Fl.php%3Fu%3Dhttp%253A%252F%252FZoo.se%252F%253Ffbclid%253DIwZXh0bgNhZW0CMTAAAR3cXkNVqxSfNVacUuCYFLhwNJr8g8dqlcAnwYTxpkl-nFrzKCERTtaf58Q_aem_TdFw2Z61zBwtGDTzP-6emg%26h%3DAT1i3dXvMTf17Azqi3gTEekPPAX5yFOL_Qq9sZX32ASBEhZxXcaNWlGqgl5V2JvrrD2uRAP7vGGrfkCYArJAkcs99rbGW2KXO114n-LmI9TcEchG9AhA2OwWje17uWi_C4-FvYiRjCcvQNyFPRUGm6_Q0Fc61-HREjY%26__tn__%3D-UK-R%26c%5B0%5D%3DAT13J2ToBAdhKXyURbHDQpU1KD7PJtJKgvtSEmyLyKtmDqnHFF1um8JujvurlwSxNMRStTL5Tmqw3KL32wkbuo1tnuzfvLkpCrDSELJrGuMPCxSJ2EEgpGm5cs9xQZzHpWcxV6pfAWHdhR0klEG5tNKm__zQ50yakF4xFhQuzLrX92ktDZr_nACNcJRMkcCBGmNTgBlS4ovOB9cescz8-N-8mQ&amp;data=05%7C02%7Culrika.danielsson%40newsec.se%7Cf47083e6f1d74429ca6e08dd72b039ed%7Ca76b06e3f40049db84dfe9a75fa473f6%7C1%7C0%7C638792823444449349%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&amp;sdata=E%2BOJFDOX0i2ZKLclUx0aurAoWdj9V6ZqZrpGWGfgcjI%3D&amp;reserved=0">Zoo.se</a></strong> kommer du välkomnas av kunnig personal, alla med olika djurintressen. Allt ifrån hunduppfödare, foderspecialister och djurvårdare. Butiken kommer ligga mellan Hemtex och Clas Ohlson och öppnar i mitten av april. Varmt välkommen till Bergvik säger vi till Zoo.se</p>\n',
    },
    excerpt: {
      rendered:
        "<p>10 april kl 10:00 öppnar djurbutikskedjan Zoo.se hos oss på Bergvik. De kommer att erbjuda akvarier med fiskar och ett stort sortiment av sällskapsdjurs-produkter med över 550 varumärken. &#8211; Vi är glada och stolta över att Zoo.se väljer att etablera sig hos oss på Bergvik, säger vår centrumchef Olof. Vi jobbar efter att ständigt utveckla, [&hellip;]</p>\n",
    },
    featured_media: 16069,
    categories: [1],
    author: 15,
  },
  {
    id: 15942,
    date: "2025-03-18T14:50:37",
    slug: "vi-hjalper-majblomman",
    link: "https://bergvik.se/aktuellt/vi-hjalper-majblomman/",
    title: {
      rendered: "Vi hjälper Majblomman",
    },
    content: {
      rendered:
        "<p>Lördag 12 april bjuder vi in till en dag där barnen står i fokus hos oss på Bergvik. <strong>För varje besök denna dag skänker vi 5 kr till Majblomman.</strong> Så ditt besök räknas och bidrar direkt till deras arbete för att motverka barnfattigdom i Sverige. Kom och delta i roliga aktiviteter för hela familjen, köp dina majblommor på plats och hjälp oss göra skillnad💛</p>\n<h2>Detta händer under dagen:</h2>\n<p><strong>Kl. 10-18 Träffa Majblomman</strong><br />\nHör mer om deras verksamhet och hur försäljningen av majblommor bidrar till att hjälpa barn som lever i fattigdom.</p>\n<p><strong>Kl. 10-18 Måla din egen majblomma.</strong></p>\n<p><strong>Kl. 10-18 Kasta ärt(blom)påsar i spelet cornhole</strong></p>\n<p><strong>Kl. 10-18 Köp majblommor</strong><br />\noch bidra till att göra skillnad för barn i Karlstad med omnejd.</p>\n<p><strong>Kl. 10-18 Truls populära pysselhörna</strong></p>\n<p><strong>Kl. 10–18 Innebandyklubben GS86 AIF besöker oss.</strong><br />\nDelta i tävlingar med fina priser som passar hela familjen. Träffa spelare, prata innebandy och testa dina innebandykunskaper. Prickskytte och speedshooting.</p>\n<p><strong>Kl. 10-15 Roliga utmaningar och tävlingar med Sundstabadet</strong><br />\nAntar du utmaningarna har du chans att vinna fina priser.</p>\n<p><strong>Kl. 10-16 ishockey-prickskytte med Kils AIK</strong></p>\n<p><strong>Kl. 10-18 Emil Meijer och Peppe Lundh från Forshaga Golfklubb</strong><br />\nPuttävling och andra roliga aktiviteter.</p>\n<p><strong>Kl. 11-15 Träffa maskot Truls</strong></p>\n<p><strong>Kl. 11-15 Träffa Mallbacken IF</strong><br />\nTävla om signerade fotbollar och få fribiljetter till nästa match.</p>\n<p><strong>Kl. 13-15 Käpphästhoppning med Rudskogens Ryttarförening</strong></p>\n<p><strong>Kl. 11-15 Kils AIK maskot Lizzy hälsar på</strong></p>\n<p><strong>Kl. 12-15 Speedshooting tillsammans Hellton</strong></p>\n<p><strong>Kl. 13-17 IF Göta på plats.</strong><br />\nTesta spänsthopp och stående längdhopp.</p>\n<p>Programmet uppdateras löpande.</p>\n<p><strong>Välkommen till Bergvik den 12 april – Tillsammans gör vi skillnad💛</strong></p>\n",
    },
    excerpt: {
      rendered:
        "<p>Lördag 12 april bjuder vi in till en dag där barnen står i fokus hos oss på Bergvik. För varje besök denna dag skänker vi 5 kr till Majblomman. Så ditt besök räknas och bidrar direkt till deras arbete för att motverka barnfattigdom i Sverige. Kom och delta i roliga aktiviteter för hela familjen, köp [&hellip;]</p>\n",
    },
    featured_media: 15943,
    categories: [1],
    author: 15,
  },
  {
    id: 15793,
    date: "2025-02-05T13:26:25",
    slug: "dela-din-bergvik-story",
    link: "https://bergvik.se/aktuellt/dela-din-bergvik-story/",
    title: {
      rendered: "Dela din Bergvik story",
    },
    content: {
      rendered:
        "<p>Nu samlar vi in stora och små ögonblick från Bergviks besökare – tillsammans blir de Bergvik Stories. Fem vinnare belönas med ett presentkort på 1 000 kronor vardera. Tävlingen pågår t o m 30 mars 2025. Skicka in ditt bidrag via formuläret nedan för att ha chansen att vinna. Lycka till!</p>\n<p>Juryn består av representanter på Bergvik, må bästa, härligaste, mest spännande, skönaste story vinna.</p>\n",
    },
    excerpt: {
      rendered:
        "<p>Nu samlar vi in stora och små ögonblick från Bergviks besökare – tillsammans blir de Bergvik Stories. Fem vinnare belönas med ett presentkort på 1 000 kronor vardera. Tävlingen pågår t o m 30 mars 2025. Skicka in ditt bidrag via formuläret nedan för att ha chansen att vinna. Lycka till! Juryn består av representanter [&hellip;]</p>\n",
    },
    featured_media: 15800,
    categories: [1],
    author: 1,
  },
  {
    id: 15684,
    date: "2024-11-27T09:48:28",
    slug: "traffa-truls-14e-december",
    link: "https://bergvik.se/aktuellt/traffa-truls-14e-december/",
    title: {
      rendered: "Träffa Truls 14:e december",
    },
    content: {
      rendered:
        "<p>Välkommen till en magisk julupplevelse här på Bergvik! Träffa vår egen maskot Truls och sprid lite julstämning tillsammans. Lämna din önskelista till honom och få en liten gåva som tack. Truls finns på plats vid lekytan klockan 13, 14 och 15 – missa inte chansen att säga hej och krama om honom!</p>\n<p>Vill du veta mer om Truls och alla hans roliga aktiviteter? Besök vår maskotsida för fler spännande överraskningar och skojiga saker att upptäcka! Passa även på att gå Truls tipspromenad och testa dina kunskaper med kluriga frågor som hela familjen kan uppskatta.</p>\n<p>Vi på Bergvik önskar dig en riktigt God Jul och ser fram emot att fira med dig här hos oss! 🎄✨</p>\n",
    },
    excerpt: {
      rendered:
        "<p>Välkommen till en magisk julupplevelse här på Bergvik! Träffa vår egen maskot Truls och sprid lite julstämning tillsammans. Lämna din önskelista till honom och få en liten gåva som tack. Truls finns på plats vid lekytan klockan 13, 14 och 15 – missa inte chansen att säga hej och krama om honom! Vill du veta [&hellip;]</p>\n",
    },
    featured_media: 15682,
    categories: [1],
    author: 15,
  },
]

// Sample media data based on the provided JSON
const sampleMedia: Record<number, WordPressMedia> = {
  16329: {
    id: 16329,
    source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild.jpg",
    alt_text: "Stenugnsbageri",
    media_details: {
      width: 2048,
      height: 1363,
      sizes: {
        medium: {
          source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild-300x200.jpg",
          width: 300,
          height: 200,
        },
        large: {
          source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild-1024x682.jpg",
          width: 1024,
          height: 682,
        },
        thumbnail: {
          source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild-150x150.jpg",
          width: 150,
          height: 150,
        },
        full: {
          source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild.jpg",
          width: 2048,
          height: 1363,
        },
      },
    },
    title: {
      rendered: "Pressbild",
    },
  },
  16093: {
    id: 16093,
    source_url: "/placeholder.svg?height=800&width=1200",
    alt_text: "Smakrådstips",
    media_details: {
      width: 1200,
      height: 800,
      sizes: {
        medium: {
          source_url: "/placeholder.svg?height=200&width=300",
          width: 300,
          height: 200,
        },
        large: {
          source_url: "/placeholder.svg?height=682&width=1024",
          width: 1024,
          height: 682,
        },
        thumbnail: {
          source_url: "/placeholder.svg?height=150&width=150",
          width: 150,
          height: 150,
        },
        full: {
          source_url: "/placeholder.svg?height=800&width=1200",
          width: 1200,
          height: 800,
        },
      },
    },
    title: {
      rendered: "Smakrådstips",
    },
  },
  16073: {
    id: 16073,
    source_url: "/placeholder.svg?height=800&width=1200",
    alt_text: "VaccinDirekt",
    media_details: {
      width: 1200,
      height: 800,
      sizes: {
        medium: {
          source_url: "/placeholder.svg?height=200&width=300",
          width: 300,
          height: 200,
        },
        large: {
          source_url: "/placeholder.svg?height=682&width=1024",
          width: 1024,
          height: 682,
        },
        thumbnail: {
          source_url: "/placeholder.svg?height=150&width=150",
          width: 150,
          height: 150,
        },
        full: {
          source_url: "/placeholder.svg?height=800&width=1200",
          width: 1200,
          height: 800,
        },
      },
    },
    title: {
      rendered: "VaccinDirekt",
    },
  },
  16069: {
    id: 16069,
    source_url: "/placeholder.svg?height=800&width=1200",
    alt_text: "Zoo.se",
    media_details: {
      width: 1200,
      height: 800,
      sizes: {
        medium: {
          source_url: "/placeholder.svg?height=200&width=300",
          width: 300,
          height: 200,
        },
        large: {
          source_url: "/placeholder.svg?height=682&width=1024",
          width: 1024,
          height: 682,
        },
        thumbnail: {
          source_url: "/placeholder.svg?height=150&width=150",
          width: 150,
          height: 150,
        },
        full: {
          source_url: "/placeholder.svg?height=800&width=1200",
          width: 1200,
          height: 800,
        },
      },
    },
    title: {
      rendered: "Zoo.se",
    },
  },
  15943: {
    id: 15943,
    source_url: "/placeholder.svg?height=800&width=1200",
    alt_text: "Majblomman",
    media_details: {
      width: 1200,
      height: 800,
      sizes: {
        medium: {
          source_url: "/placeholder.svg?height=200&width=300",
          width: 300,
          height: 200,
        },
        large: {
          source_url: "/placeholder.svg?height=682&width=1024",
          width: 1024,
          height: 682,
        },
        thumbnail: {
          source_url: "/placeholder.svg?height=150&width=150",
          width: 150,
          height: 150,
        },
        full: {
          source_url: "/placeholder.svg?height=800&width=1200",
          width: 1200,
          height: 800,
        },
      },
    },
    title: {
      rendered: "Majblomman",
    },
  },
  15800: {
    id: 15800,
    source_url: "/placeholder.svg?height=800&width=1200",
    alt_text: "Bergvik Story",
    media_details: {
      width: 1200,
      height: 800,
      sizes: {
        medium: {
          source_url: "/placeholder.svg?height=200&width=300",
          width: 300,
          height: 200,
        },
        large: {
          source_url: "/placeholder.svg?height=682&width=1024",
          width: 1024,
          height: 682,
        },
        thumbnail: {
          source_url: "/placeholder.svg?height=150&width=150",
          width: 150,
          height: 150,
        },
        full: {
          source_url: "/placeholder.svg?height=800&width=1200",
          width: 1200,
          height: 800,
        },
      },
    },
    title: {
      rendered: "Bergvik Story",
    },
  },
  15682: {
    id: 15682,
    source_url: "/placeholder.svg?height=800&width=1200",
    alt_text: "Träffa Truls",
    media_details: {
      width: 1200,
      height: 800,
      sizes: {
        medium: {
          source_url: "/placeholder.svg?height=200&width=300",
          width: 300,
          height: 200,
        },
        large: {
          source_url: "/placeholder.svg?height=682&width=1024",
          width: 1024,
          height: 682,
        },
        thumbnail: {
          source_url: "/placeholder.svg?height=150&width=150",
          width: 150,
          height: 150,
        },
        full: {
          source_url: "/placeholder.svg?height=800&width=1200",
          width: 1200,
          height: 800,
        },
      },
    },
    title: {
      rendered: "Träffa Truls",
    },
  },
}

// Sample comment counts
const sampleCommentCounts: Record<number, number> = {
  16328: 5,
  16091: 3,
  16071: 2,
  16068: 7,
  15942: 1,
  15793: 0,
  15684: 4,
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const postsPerPage = 6

  // Get the first post for the featured section
  const featuredPost = samplePosts[0]
  const featuredMedia = sampleMedia[featuredPost.featured_media]

  // Rest of the posts for the grid
  const gridPosts = samplePosts.slice(1)

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = gridPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(gridPosts.length / postsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to the top of the posts section
    document.getElementById("posts-section")?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div>
      {/* Featured Post */}
      <div className={`bg-emerald-50 py-12 transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div
                className="transform transition-transform duration-700 delay-300"
                style={{ transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
              >
                <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full hover:bg-emerald-200 transition-colors">
                  Featured Story
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{featuredPost.title.rendered}</h1>
                <div
                  className="text-gray-600 mb-6 text-base italic font-light"
                  dangerouslySetInnerHTML={{ __html: featuredPost.excerpt.rendered }}
                />
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <span>{formatDate(featuredPost.date)}</span>
                  {sampleCommentCounts[featuredPost.id] > 0 && (
                    <div className="flex items-center ml-4">
                      <span className="inline-block w-1 h-1 rounded-full bg-gray-400 mr-2"></span>
                      <span>{sampleCommentCounts[featuredPost.id]} comments</span>
                    </div>
                  )}
                </div>
                <Link
                  href={`/post/${featuredPost.slug}`}
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all hover:shadow-md group"
                >
                  Read Full Story
                  <ArrowRight
                    size={18}
                    className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
              <div
                className="relative h-[300px] md:h-[350px] rounded-lg overflow-hidden shadow-lg transform transition-all duration-700 delay-500"
                style={{
                  transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <Image
                  src={featuredMedia.source_url || "/placeholder.svg"}
                  alt={featuredMedia.alt_text || featuredPost.title.rendered}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Grid */}
      <div className="py-12" id="posts-section">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post, index) => (
              <div
                key={post.id}
                className="transform transition-all duration-500"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <PostCard
                  post={post}
                  media={sampleMedia[post.featured_media]}
                  commentCount={sampleCommentCounts[post.id] || 0}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">Stay updated with the latest news and events from Bergvik.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all hover:shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
