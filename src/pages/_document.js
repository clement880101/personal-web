import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "../utils/createEmotionCache";

export default class newDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="favicon.ico" />
                    <link rel="apple-touch-icon" href="logo192.png" />
                    <link rel="manifest" href="manifest.json" />
                    {this.props.emotionStyleTags}
                </Head>
                <body style={{ transition: "background-color 1s ease-in-out" }}>
                    <Main />
                    <NextScript />
                </body>
                <noscript>
                    You need JS to run this website
                </noscript>
            </Html>
        )
    }
}

newDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx);

    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(" ")}`}
            key={style.key}
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};