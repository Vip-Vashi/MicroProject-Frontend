import React from 'react'

function FAQ() {
    const faqsList = [
        {
            q: "How does an online auction work?",
            a: "An online auction allows users to bid on items listed for sale within a specific timeframe. The seller sets a starting price, and bidders place incremental bids until the auction ends. The highest bidder at the end of the auction wins the item and is typically required to complete the purchase by making a payment."
        },
        {
            q: "What happens if no one bids on an auction?",
            a: "If no bids are placed during the auction period, the item will not be sold. In most systems, the auction status will be marked as 'unsold,' and the seller may choose to relist the item or offer it through other sales channels."
        },
        {
            q: "Can I retract a bid once it has been placed?",
            a: "In most online auction systems, bids are considered binding and cannot be retracted once placed. However, some platforms may allow bid retraction under specific circumstances, such as an accidental bid or a significant error in the listing. It's important to review the auction platform's rules before placing a bid."
        },
        {
            q: "How can I be sure that the auction process is fair?",
            a: "Reputable online auction platforms implement various measures to ensure fair bidding, such as time-stamped bids, transparent bid histories, and strict adherence to auction rules. Additionally, the platform may use anti-fraud systems to detect and prevent any suspicious activities, such as shill bidding."
        },
        {
            q: "What happens after I win an auction?",
            a: "Once you win an auction, you will typically receive a notification with payment instructions. You will be required to pay the final bid amount, possibly including shipping costs, within a specified period. After the payment is completed, the seller will ship the item to you. It's crucial to complete the transaction promptly to avoid penalties or losing the item."
        }
    ]

    return (
        <section className='py-14 bg-gray-900' id='about'>
            <div className="max-w-screen-xl mx-auto px-4 gap-12 md:flex md:px-8">
                <div className='flex-1'>
                    <div className="max-w-lg">
                        <h3 className='font-semibold text-cyan-400'>
                            Frequently asked questions
                        </h3>
                        <p className='mt-3 text-white text-3xl font-extrabold sm:text-4xl'>
                            All information you need to know
                        </p>
                    </div>
                </div>
                <div className='flex-1 mt-12 md:mt-0'>
                    <ul className='space-y-4 divide-y divide-gray-700'>
                        {faqsList.map((item, idx) => (
                            <li
                                className="py-5"
                                key={idx}>
                                <summary
                                    className="flex items-center justify-between font-semibold text-gray-200">
                                    {item.q}
                                </summary>
                                <p
                                    dangerouslySetInnerHTML={{ __html: item.a }}
                                    className='mt-3 text-gray-300 leading-relaxed'>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default FAQ
