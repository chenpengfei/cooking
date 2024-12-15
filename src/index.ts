import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/hello-ai', async (c) => {
  const results = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    messages: [
      { "role": "user", "content": "Say hello world in five different languages, include chinese"}
    ]
  })
  return c.json(results);
})

app.get('/instruction', async (c) => {
  const results = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    messages: [
      { role: "system", content: "you are a professional computer science assistant" },
      { role: "user", content: "what is WASM?" },
      { role: "assistant", content: "WASM (WebAssembly) is a binary instruction format that is designed to be a platform-agnostic" },
      { role: "user", content: "does Python compile to WASM?" },
      { role: "assistant", content: "No, Python does not directly compile to WebAssembly" },
      { role: "user", content: "what about Rust?" },
    ],
  })
  return c.json(results);
})

export default app