const Footer = () => (
  <footer className="border-t border-border py-8 px-4 text-center">
    <p className="text-muted-foreground">
      جميع الحقوق محفوظة © {new Date().getFullYear()} <span className="text-primary font-bold">عطور سالم</span>
    </p>
    <p className="text-sm text-muted-foreground mt-2">
      تصميم وتطوير بواسطة <span className="text-primary">بودي العارف</span>
    </p>
  </footer>
);

export default Footer;
