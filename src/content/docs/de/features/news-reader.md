---
title: News Reader
description: Engineering blog RSS aggregator with 35+ feeds from top tech companies and thought leaders.
---

CodeBuddy includes a built-in engineering news reader that aggregates RSS feeds from top tech companies, AI research labs, and engineering thought leaders. Articles are cached in SQLite and displayed in a dedicated webview panel.

## Feeds

The news reader pulls from **35+ curated RSS feeds** across several categories:

### Company engineering blogs

| Source             | Feed                                     |
| ------------------ | ---------------------------------------- |
| OpenAI             | `openai.com/blog/rss.xml`                |
| Google Developers  | `developers.googleblog.com`              |
| Stripe Engineering | `stripe.com/blog/feed.rss`               |
| GitHub Engineering | `github.blog/engineering/feed`           |
| Microsoft DevBlogs | `devblogs.microsoft.com/feed`            |
| AWS Architecture   | `aws.amazon.com/blogs/architecture/feed` |
| Slack Engineering  | `slack.engineering/feed`                 |
| Netflix Tech Blog  | `netflixtechblog.com/feed`               |
| Uber Engineering   | `uber.com/blog/engineering/rss`          |
| Dropbox Tech Blog  | `dropbox.tech/feed`                      |
| Pinterest Eng.     | `medium.com/feed/pinterest-engineering`  |
| Cloudflare Blog    | `blog.cloudflare.com/rss`                |

### AI & research

| Source                | Feed                              |
| --------------------- | --------------------------------- |
| Google Research       | `research.google/blog/rss`        |
| Hugging Face          | `huggingface.co/blog/feed.xml`    |
| Berkeley AI (BAIR)    | `bair.berkeley.edu/blog/feed.xml` |
| Lil'Log (Lilian Weng) | `lilianweng.github.io/index.xml`  |
| Anthropic Research    | `anthropic.com/research/rss.xml`  |
| DeepMind Blog         | `deepmind.google/blog/rss.xml`    |
| Meta AI Blog          | `ai.meta.com/blog/rss`            |
| LangChain Blog        | `blog.langchain.dev/rss`          |

### Newsletters & thought leaders

| Source                   | Feed                                    |
| ------------------------ | --------------------------------------- |
| The Pragmatic Engineer   | `newsletter.pragmaticengineer.com/feed` |
| ByteByteGo System Design | `blog.bytebytego.com/feed`              |
| Tidy First? (Kent Beck)  | `tidyfirst.substack.com/feed`           |
| Martin Fowler            | `martinfowler.com/feed.atom`            |
| Simon Willison's Weblog  | `simonwillison.net/atom/everything`     |
| The Engineering Manager  | `theengineeringmanager.com/feed`        |
| Charity Majors           | `charity.wtf/feed`                      |
| StaffEng                 | `staffeng.com/rss`                      |
| LeadDev                  | `leaddev.com/feed`                      |

### Architecture & systems

| Source             | Feed                       |
| ------------------ | -------------------------- |
| High Scalability   | `highscalability.com/feed` |
| InfoQ              | `feed.infoq.com`           |
| The New Stack      | `thenewstack.io/feed`      |
| Architecture Notes | `architecturenotes.co/rss` |

## How it works

1. **Fetch** — Each feed is fetched via RSS parser with a 10-second timeout
2. **Filter** — The 2 most recent articles from each feed are extracted
3. **Sort** — All articles are sorted by publication date
4. **Store** — Top results are persisted in a SQLite `news_items` table
5. **Display** — Articles appear in the CodeBuddy News webview panel

## Article data model

Each article stores:

| Field          | Description                             |
| -------------- | --------------------------------------- |
| `title`        | Article headline                        |
| `url`          | Link to the original article            |
| `summary`      | First 300 characters of content snippet |
| `source`       | Feed name (e.g. "Netflix Tech Blog")    |
| `published_at` | Publication date from the RSS entry     |
| `read_status`  | 0 = unread, 1 = read                    |
| `saved`        | 0 = not saved, 1 = saved (bookmarked)   |

## Webview panel

The news reader panel (`CodeBuddyNewsReaderPanel`) provides:

- Article list with source, title, date, and read/unread indicator
- Click-to-read with a clean article view
- Save/bookmark articles for later
- Mark as read/unread
- Filter by source or category
