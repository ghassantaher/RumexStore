import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedCategoryAction } from './Store';
export const PrivacyPolicy = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  React.useEffect(() => {
    // dispatch(setSelectedCategoryAction(location.pathname));
    dispatch(
      setSelectedCategoryAction(location.pathname, {
        categoryName: location.pathname,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="privacy-policy">
      <h1 className="text-center mb-0">Privacy Policy</h1>
      {/* <div className="bg-light py-1 mb-1">
        <div className="container">
          <h1 className="display-1 text-center mb-0">Privacy Policy</h1>
        </div>
      </div> */}
      <div className="container">
        <div className="row">
          <div className="col-lg-3 mb-3 mb-lg-0">
            <nav aria-label="Page Navigation" className="sticky-top pt-lg-3">
              <div className="card">
                {/* <h2 className="card-header h5 fw-bold text-uppercase">
                  Page Navigation
                </h2> */}
                <h3 className="card-header text-uppercase">Page Navigation</h3>
                <div
                  className="list-group list-group-flush"
                  id="page-navigation"
                >
                  <a
                    href="#section-1"
                    className="list-group-item list-group-item-action"
                  >
                    WHAT INFORMATION DO WE COLLECT?
                  </a>
                  <a
                    href="#section-2"
                    className="list-group-item list-group-item-action"
                  >
                    HOW DO WE PROCESS YOUR INFORMATION?
                  </a>
                  <a
                    href="#section-3"
                    className="list-group-item list-group-item-action"
                  >
                    WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                  </a>
                </div>
              </div>
            </nav>
          </div>
          <div className="col-lg-9 pt-lg-3">
            <article className="mb-5">
              {/* <p className="lead"> */}
              <mark className="lead">
                Please note that Rumex Store Demo is for training and
                demonstration purposes only. It is not intended to be a live
                production website.
                {/* If you provide your personal data during the
                training or demonstrations, we will collect and store your
                personal information as part of the training and demonstration
                functions of the website. This information will be used solely
                to provide the training and demonstrations and for no other
                purposes. It is possible that some third party technology is
                implemented as part of this website. Such third-party technology
                may collect and store the information provided by you. We
                recommend that you do not provide any personal information to us
                in your use of this website. However, if you do participate in
                the training or demonstrations of this website, the information
                you provide is solely in your discretion and at your own risk.
                If you do not wish to participate please do not use this
                website. */}
              </mark>
              {/* </p> */}
              <p>
                This privacy notice for Rumex Store Demo ("
                <strong>Company</strong>," "<strong>we</strong>," "
                <strong>us</strong>," or "<strong>our</strong>"), describes how
                and why we might collect, store, use, and/or share ("
                <strong>process</strong>") your information when you use our
                services ("<strong>Services</strong>"), such as when you:
              </p>
              <ul data-rte-list="default">
                <li>
                  <p>
                    Visit our Rumex Store Demo website, or any website of ours
                    that links to this privacy notice
                  </p>
                </li>
                <li>
                  <p>
                    Engage with us in other related ways, including any sales,
                    marketing, or events
                  </p>
                </li>
              </ul>
              <p>
                <strong>Questions or concerns? </strong>Reading this privacy
                notice will help you understand your privacy rights and choices.
                If you do not agree with our policies and practices, please do
                not use our Services.
                {/* If you still have any questions or
                concerns, please contact us at web@.com. */}
              </p>
              <section className="mb-3 mt-3" id="section-1">
                <h2>WHAT INFORMATION DO WE COLLECT?</h2>
                <h3>What we collect</h3>
                <p>
                  This is a demonstration website only and at this stage we do
                  not collect any information from the user.
                </p>
                <h3>Information we don't collect</h3>
                <ul>
                  <li>
                    <strong>
                      <span>We don&rsquo;t record country of origin</span>
                    </strong>
                  </li>
                  <li>
                    <strong>
                      <span>
                        We don&rsquo;t record personally identifible browser or
                        OS information
                      </span>
                    </strong>
                  </li>
                  <li>
                    <strong>
                      <span>We don&rsquo;t record your IP address</span>
                    </strong>
                    {/* <ul>
                      <li>
                        The only exception is for automated search requests
                        (robots) that rapidly submit more queries to our servers
                        than any normal human would. When our software detects
                        potential abuse, we register and block the offending IP
                        address in order to keep our service safe and free.
                      </li>
                    </ul> */}
                  </li>
                  <li>
                    <strong>
                      <span>
                        We don&rsquo;t serve any tracking or identifying cookies
                      </span>
                    </strong>
                    {/* <ul>
                      <li>
                        This is about "good" and "bad" cookies. Cookies are
                        small pieces of data that are sent to your hard drive by
                        websites you visit. "Bad" cookies have unique elements
                        that can track all kinds of personal information. We
                        don&rsquo;t serve any of those. Startpage uses just one
                        "good" cookie called "preferences" in order to remember
                        the search preferences you choose. It&rsquo;s completely
                        anonymous and expires after not visiting Startpage for
                        90 days.
                      </li>
                    </ul> */}
                  </li>
                </ul>
              </section>
              <section className="mb-3" id="section-2">
                <h2>HOW DO WE PROCESS YOUR INFORMATION?</h2>
                <p>
                  At this stage we don&rsquo;t process any of your information
                </p>
                <p>
                  <strong>Sensitive Information.</strong> We do not process
                  sensitive information.
                </p>
              </section>
              <section className="mb-3" id="section-3">
                <h2>
                  WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </h2>
                <p>
                  At this stage we don&rsquo;t share your personal information
                  with any third party.
                </p>
              </section>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};
