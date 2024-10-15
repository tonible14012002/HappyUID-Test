import { http, HttpResponse } from 'msw'

import { sleep } from '../src/utils/sleep'

export const handlers = [
  http.get('http://localhost:4000/api/docs_list', async () => {
    await sleep(3000)

    return HttpResponse.json({
      status: 'ok',
    })
  }),
]
