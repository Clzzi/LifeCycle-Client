const Favicon = () => {
  return (
    <>
      <meta name="apple-mobile-web-app-title" content="lifecycle" />
      <meta name="application-name" content="lifecycle" />

      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="https://s3.console.aws.amazon.com/s3/object/lifecycle-s3?region=ap-northeast-2&prefix=assets/Favicon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://s3.console.aws.amazon.com/s3/object/lifecycle-s3?region=ap-northeast-2&prefix=assets/Favicon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://s3.console.aws.amazon.com/s3/object/lifecycle-s3?region=ap-northeast-2&prefix=assets/Favicon.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href="https://s3.console.aws.amazon.com/s3/object/lifecycle-s3?region=ap-northeast-2&prefix=assets/Favicon.png"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#123550" />
      <meta name="theme-color" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Clzzi" />
      <meta name="keywords" content="개발자, 포트폴리오, 이력서, 대소고" />
      <meta charSet="utf-8" />
      <link rel="dns-prefetch" href="http://34.125.196.189:8080" />
      <link
        rel="dns-prefetch"
        href="https://lifecycle-s3.s3.ap-northeast-2.amazonaws.com"
      />
      <link rel="preconnect" href="http://34.125.196.189:8080" />
      <link
        rel="preconnect"
        href="https://lifecycle-s3.s3.ap-northeast-2.amazonaws.com"
      />
    </>
  );
};

export default Favicon;
