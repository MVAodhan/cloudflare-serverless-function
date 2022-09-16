export async function onRequestPost(context) {
  const data = {
    hello: 'world',
  };

  const json = JSON.stringify(data, null, 2);

  return context.event.respondWith(
    new Response(context, {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  );
}
